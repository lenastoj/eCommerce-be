import Article from '@models/article.model';
import Color from '@models/color.model';
import Size from '@models/size.model';
import User from '@models/user.model';
import { paginate } from '@utils/paginate';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

export const getArticles = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10 }: { page?: number; pageSize?: number } =
    req.query;

  try {
    const articles = await paginate(
      Article,
      {
        attributes: [
          'id',
          'name',
          'imageUrl',
          'price',
          'inStock',
          'gender',
          'createdAt',
          'updatedAt',
        ],
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
          {
            model: User,
            through: {
              attributes: []
            }
          }
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
  console.log(req.files);
  const { name, description, colors, sizes, price, inStock, gender } = req.body;

  const userId = req.session.user.id;
  const imageFile = req.files.imageUrl as UploadedFile;

  const imageUrl = `${Date.now()}--${name.replaceAll('"', '')}`;

  imageFile.mv("uploads/" + `${Date.now()}--${name}`);

  try {
    const article = await Article.create({
      name,
      description,
      imageUrl,
      price,
      inStock,
      gender,
      userId,
    });

    await Promise.all([
      ...colors.map((id) => article.$add('colors', id)),
      ...sizes.map((id) => article.$add('sizes', id)),
    ]);

    return res.status(200).json(article);
  } catch (error) {
    return res.json(error);
  }
};
