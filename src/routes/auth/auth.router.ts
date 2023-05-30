import authMe from '@controlers/authme.controller';
import login from '@controlers/login.controler';
import logout from '@controlers/logout.controler';
import register from '@controlers/register.contorler';
import { isAuth, isNotAuth } from '@utils/isAuth';
import validatorSchema from '@utils/validator';
import loginValidator from '@validators/login.validator';
import registerValidator from '@validators/register.validator';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', isNotAuth, loginValidator, validatorSchema, login);
authRouter.post(
  '/register',
  isNotAuth,
  registerValidator,
  validatorSchema,
  register
);
authRouter.post('/logout', isAuth, logout);
authRouter.get('/auth/me', isAuth, authMe);

export default authRouter;
