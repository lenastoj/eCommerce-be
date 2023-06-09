import Article from '@models/article.model';
import Cart from '@models/cart.model';
import { CartArticle } from '@models/cartArticle.model';
import Color from '@models/color.model';
import Size from '@models/size.model';
import { Request, Response } from 'express';

export const createCart = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.body.userId;
    const userId = req.session.user.id;
    const existingCart = await Cart.findOne({
      where: {
        userId,
      },
    });

    if (existingCart) {
      return res.status(200).json({ message: 'Cart already exists' });
    }

    const cart = await Cart.create({
      userId,
    });
    return res.status(200).json(cart);
  } catch (error) {
    return res.json(error);
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.session.user.id;
    const cart = await Cart.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: Article,
          include: [{ model: Color }, { model: Size }],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addArticleToCart = async (req: Request, res: Response) => {
  try {
    const articleId = req.body.articleId;
    const cartId = req.body.cartId;

    const cart = await Cart.findOne({
      where: {
        id: cartId,
      },
      include: [{ model: Article }],
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const articleExists = cart.articles.some(
      (article) => article.id === articleId
    );

    if (articleExists) {
      const cartArticle = await CartArticle.findOne({
        where: {
          cartId,
          articleId,
        },
      });

      await cartArticle.update({
        quantity: cartArticle.quantity + 1,
      });

      const updatedCart = await Cart.findOne({
        where: {
          id: cartId,
        },
        include: [
          { model: Article, include: [{ model: Color }, { model: Size }] },
        ],
      });
      return res.status(200).json(updatedCart);
    }

    await CartArticle.create({ cartId, articleId });

    const updatedCart = await Cart.findOne({
      where: {
        id: cartId,
      },
      include: [{ model: Article }],
    });

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error adding article to cart:', error);
    res.status(500).json({ error: 'Internal server error - add article' });
  }
};

export const quantityArticleCart = async (req: Request, res: Response) => {
  try {
    const newQuantity = req.body.quantity || 1;
    const cartId = req.body.cartId;
    const articleId = req.body.articleId;
    const cartArticle = await CartArticle.findOne({
      where: {
        cartId,
        articleId,
      },
    });

    if (!cartArticle) {
      return res.status(404).json({ message: 'No article found' });
    }

    await cartArticle.update({
      quantity: newQuantity,
    });

    const updatedCart = await Cart.findOne({
      where: { id: cartId },
      include: [
        { model: Article, include: [{ model: Color }, { model: Size }] },
      ],
    });
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error quantity:', error);
    res.status(500).json({ error: 'Internal server error - quantity change' });
  }
};

export const removeArticleFromCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.body.cartId;
    const articleId = req.body.articleId;

    await CartArticle.destroy({
      where: { cartId, articleId },
    });
    return res.status(200).json('Successfuly removed article');
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error - removing article' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.body.cartId;
    await CartArticle.destroy({
      where: { cartId },
    });
    return res.status(200).json('Successfuly cleard cart');
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error - clearing cart' });
  }
};
