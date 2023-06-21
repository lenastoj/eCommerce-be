import { createPayment } from '@controlers/payment.controller';
import { isAuth } from '@utils/isAuth';
import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.post('/create-payment-intent', isAuth, createPayment);


export default paymentRouter;