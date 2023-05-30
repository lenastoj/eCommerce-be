import User from '@models/user.model';
import { Request, Response } from 'express';
import PasswordManager from '@utils/password.manager';
import { sanitizeUser } from '@utils/sanitizers';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if(!user) {
      return res.status(400).json({
        success: false,
        errors: { message: 'Invalid Credentials!' },
      });
    }

    const passwordCompare = await PasswordManager.verify(
      user.password,
      password
    );

    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        errors: { message: 'Invalid Credentials!' },
      });
    }

    req.session.user = user;

    return res.status(200).json({data: {user: sanitizeUser(user)}});
  } catch (error) {
    return res.json(error);
  }
};

export default login;
