import Article from '@models/article.model';
import Order from '@models/order.model';
import { paginate } from '@utils/paginate';
import { Request, Response } from 'express';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.session.user.id;
    const {page = 1}: {page?: number;} = req.query;

    const orders = await paginate(Order, {
      where: { userId },
      include: [
        {
          model: Article,
          attributes: ['id', 'name', 'imageUrl', 'price', 'gender'],
        },
      ],
    }, page);

    if (!orders) {
      return res.status(404).json({ message: 'There are no orders' });
    }

    return res.json(orders);
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
