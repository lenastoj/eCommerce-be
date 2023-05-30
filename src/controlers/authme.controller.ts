import { sanitizeUser } from '@utils/sanitizers';
import { Request, Response } from 'express';

const authMe = (req: Request, res: Response) => {
  const user = req.session.user;
  return res.status(200).json(sanitizeUser(user));
};

export default authMe;
