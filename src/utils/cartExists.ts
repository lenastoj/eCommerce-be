import Article from '@models/article.model';
import Cart from '@models/cart.model';
import { NextFunction, Request, Response } from 'express';
import { includes } from 'lodash';

export const cartExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session.cart) {
      const userId: number = req.session.user.id;
      const [cart] = await Cart.findOrCreate({
        where: {
          userId,
        },
        defaults: {
          userId,
        },
        include: [{model: Article}]
      });
      req.session.cart = cart;
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
