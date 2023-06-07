import Size from '@models/size.model';
import { Request, Response } from 'express';

export const getSizes = async (req: Request, res: Response) => {
  try {
    const sizes = await Size.findAll();
    res.status(200).json(sizes);
  } catch (error) {
    console.error('Error retrieving sizes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
