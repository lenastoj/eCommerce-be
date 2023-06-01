import { Router } from 'express';
import authRouter from './auth/auth.router';
import articleRouter from './article.router';

const router = Router();

router.use(authRouter);
router.use(articleRouter);

export default router;
