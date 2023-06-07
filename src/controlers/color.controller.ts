import Color from '@models/color.model';
import { Request, Response } from 'express';

export const getColors= async (req: Request, res: Response) => {
  try {
    const colors = await Color.findAll();
    res.status(200).json(colors);
  } catch (error) {
    console.error('Error retrieving colors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
