import {
  addArticleToCart,
  clearCart,
  createCart,
  getCart,
  quantityArticleCart,
  removeArticleFromCart,
} from '@controlers/cart.controller';
import { isAuth } from '@utils/isAuth';
import { Router } from 'express';

const cartRouter = Router();

cartRouter.get('/cart', isAuth, getCart);
cartRouter.post('/cart', isAuth, createCart);
cartRouter.post('/add-cart', isAuth, addArticleToCart);
cartRouter.post('/quantity-cart', isAuth, quantityArticleCart);
cartRouter.delete('/cart', isAuth, clearCart);
cartRouter.delete('/article-cart', isAuth, removeArticleFromCart);

export default cartRouter;
