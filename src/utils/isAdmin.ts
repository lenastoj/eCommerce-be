import { NextFunction, Request, Response } from 'express';
import { responseServerAuthorizationError } from './errors';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user &&  req.session.user.isAdmin === true) return next();
  
  return responseServerAuthorizationError(res, 'Authorization invalid');
};
