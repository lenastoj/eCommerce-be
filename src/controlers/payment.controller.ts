import Stripe from 'stripe';
import { Request, Response } from 'express';
import Order from '@models/order.model';
import { OrderArticle } from '@models/orderArticle.model';
import { CartArticle } from '@models/cartArticle.model';
import Cart from '@models/cart.model';

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
});

const getTotalPriceOfCart = (cart) => {
  const amount = cart.articles.reduce((accumulator, article) => {
    return accumulator + article.price * article.CartArticle.quantity;
  }, 0);

  return amount * 100 || 0;
};

export const createPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { currency = 'usd' }: { currency: string } = req.body;
  const amount = getTotalPriceOfCart(req.session.cart);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      metadata: {
        userId: req.session.user.id,
        cartId: req.session.cart.id,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const webHook = async (req: Request, res: Response) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK;
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.created': {
      const data = event.data.object;
      try {
        const cartArticle = await CartArticle.findAll({
          where: { cartId: data.metadata.cartId },
        });

        let order = await Order.findOne({
          where: { cartId: data.metadata.cartId },
        });

        if (order) {
          return res.status(400);
        }
        order = await Order.create({
          userId: data.metadata.userId,
          amount: data.amount,
          cartId: data.metadata.cartId,
        });

        cartArticle.forEach(async (item) => {
          await OrderArticle.create({
            quantity: item.quantity,
            orderId: order.id,
            articleId: item.articleId,
          });
        });
        return res.status(200);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    case 'payment_intent.succeeded': {
      const data = event.data.object;
      try {
        await Order.update(
          { status: 'Paid' },
          {
            where: { userId: data.metadata.userId, status: 'In review' },
          }
        );
        await Cart.destroy({
          where: { id: data.metadata.cartId },
        });

        return res.status(200);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    default:
      console.log('\x1b[35m%s\x1b[0m', `Unhandled event type ${event.type}`);
  }

  res.send();
};
