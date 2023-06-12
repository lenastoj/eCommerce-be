import { Router } from 'express';
import authRouter from './auth/auth.router';
import articleRouter from './article.router';
import cartRouter from './cart.router';

const router = Router();

router.use(authRouter);
router.use(articleRouter);
router.use(cartRouter);

export default router;
