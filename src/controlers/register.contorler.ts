import User from '@models/user.model';
import { Request, Response } from 'express';
import PasswordManager from '@utils/password.manager';
import { sanitizeUser } from '@utils/sanitizers';

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await PasswordManager.hash(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    req.session.user = user;
    return res.status(201).json({ data: { user: sanitizeUser(user) } });
  } catch (error) {
    return res.json(error);
  }
};

export default register;
