import {
  addArticleToCart,
  clearCart,
  getCart,
} from '@controlers/cart.controller';
import { cartExists } from '@utils/cartExists';
import { isAuth } from '@utils/isAuth';
import { Router } from 'express';

const cartRouter = Router();

cartRouter.get('/cart', isAuth, cartExists, getCart);
cartRouter.put('/cart', isAuth, cartExists, addArticleToCart);
cartRouter.delete('/cart', isAuth, cartExists, clearCart);

export default cartRouter;
