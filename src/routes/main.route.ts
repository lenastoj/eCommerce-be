import { Router } from 'express';
import authRouter from './auth/auth.router';
import articleRouter from './article.router';
import cartRouter from './cart.router';
import paymentRouter from './payment.router';
import orderRouter from './order.router';

const router = Router();

router.use(authRouter);
router.use(articleRouter);
router.use(cartRouter);
router.use(paymentRouter);
router.use(orderRouter);

export default router;
