import Article from '@models/article.model';
import Order from '@models/order.model';
import { Request, Response } from 'express';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.session.user.id;

    const order = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Article,
          attributes: ['id', 'name', 'imageUrl', 'price', 'gender'],
        },
      ],
    });

    if (order.length < 1) {
      return res.status(404).json({ message: 'There are no orders' });
    }

    console.log('order**** ', order);
    return res.json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
