import { getOrders } from '@controlers/order.controller';
import { isAuth } from '@utils/isAuth';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.get('/orders', isAuth, getOrders);


export default orderRouter;