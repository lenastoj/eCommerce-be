import Article from '@models/article.model';
import Cart from '@models/cart.model';
import { CartArticle } from '@models/cartArticle.model';
import { Request, Response } from 'express';

export const addArticleToCart = async (req: Request, res: Response) => {
  try {
    const { articleId, quantity = 1 } = req.body;

    let article = req.session?.cart?.articles?.find((i) => i.id === articleId);

    if (!article) {
      article = await CartArticle.create({
        cartId: req.session.cart.id,
        articleId,
      });
    }

    if (quantity === 0) {
      await CartArticle.destroy({
        where: { cartId: req.session.cart.id, articleId },
      });
    }

    req.session.cart = await Cart.findByPk(req.session.cart.id, {
      include: [{ model: Article }],
    });
    article = req.session.cart.articles.find((i) => i.id === articleId);

    if (quantity > 0) {
      article.CartArticle.quantity = quantity;
      await CartArticle.update(
        {
          quantity: quantity,
        },
        { where: { cartId: req.session.cart.id, articleId } }
      );
    }
    return res.status(201).json(req.session.cart);
  } catch (error) {
    console.error('Error adding article to cart:', error);
    res.status(500).json({ error: 'Internal server error - add article' });
  }
};



export const getCart = async (req: Request, res: Response) => {
  try {
    return res.json(req.session.cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const clearCart = async (req: Request, res: Response) => {
  try {
    await Cart.destroy({
      where: { id: req.session.cart.id },
    });
    req.session.cart = undefined;
    return res.status(202).json({message: 'Successfuly cleard cart'});
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error - clearing cart' });
  }
};
