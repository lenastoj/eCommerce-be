import Article from '@models/article.model';
import Color from '@models/color.model';
import Size from '@models/size.model';
import { paginate } from '@utils/paginate';
import { Request, Response } from 'express';

export const getArticles = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10 }: { page?: number; pageSize?: number } =
    req.query;

  try {
    const articles = await paginate(
      Article,
      {
        attributes: ['id', 'name', 'imageUrl', 'price', 'inStock', 'gender', 'createdAt', 'updatedAt'],
        include: [
          {
            model: Color,
            through: {
              attributes: [],
            },
          },
          {
            model: Size,
            through: {
              attributes: [],
            },
          },
        ],
      },
      page
    );

    if (!articles) {
      return res.status(404).json({ message: 'There are no articles' });
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error('Error retrieving articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const article = await Article.findOne({
      where: {
        name,
      },
      include: [
        {
          model: Color,
          through: {
            attributes: [],
          },
        },
        {
          model: Size,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error('Error retrieving article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addArticle = async (req: Request, res: Response) => {
  const { name, description, imageUrl, colors, sizes, price, inStock, gender } =
    req.body;

  try {
    const article = await Article.create({
      name,
      description,
      imageUrl,
      price,
      inStock,
      gender,
    });

    // Add the associated colors
    await article.$add('colors', colors);

    // Add the associated sizes
    await article.$add('sizes', sizes);

    return res.status(200).json(article);
  } catch (error) {
    return res.json(error);
  }
};
