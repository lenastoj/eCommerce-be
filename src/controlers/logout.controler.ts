import { Request, Response } from 'express';

const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        errors: {
          message: 'Somethnig bad has happend',
          value: 'unknown',
        },
      });
    }

    return res.status(200).json({ success: true });
  });
};

export default logout;
