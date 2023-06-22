import Article from '@models/article.model';
import Color from '@models/color.model';
import Size from '@models/size.model';
import User from '@models/user.model';
import { paginate } from '@utils/paginate';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { FindOptions, Op } from 'sequelize';
import { mainMailSend } from '@services/transporter.service';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      sort,
      orderBy = 'asc',
      size,
      color,
      gender,
    }: {
      page?: number;
      sort?: string;
      orderBy?: string;
      gender?: string;
      size?: number[];
      color?: string[];
    } = req.query;

    const articleQuery: FindOptions = {
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
        color
          ? {
              model: Color,
              where: { name: { [Op.in]: color } },
            }
          : {
              model: Color,
            },
        size
          ? {
              model: Size,
              where: { sizeShoe: { [Op.in]: size } },
            }
          : {
              model: Size,
            },
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      ],

      order: sort && [[sort, orderBy.toUpperCase()]],
      where: gender && { gender },
    };

    const articles = await paginate(Article, articleQuery, page);

    if (!articles) {
      return res.status(404).json({ message: 'There are no articles' });
    }

    res.json(articles);
  } catch (error) {
    console.error('Error retrieving articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchArticles = async (req: Request, res: Response) => {
  try {
    const { searchParams } = req.body;
    const queryOptions: FindOptions = {
      attributes: ['id', 'name', 'imageUrl', 'price', 'gender'],
      limit: 5,
      where: searchParams && { name: { [Op.substring]: searchParams } },
    };

    const articles = await Article.findAll(queryOptions);

    if (!articles) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.json(articles);
  } catch (error) {
    return res.json(error);
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
        },
        {
          model: Size,
        },
        {
          model: User,
          attributes: ['firstName', 'lastName'],
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
  try {
    const { name, description, colors, sizes, price, inStock, gender } =
      req.body;

    const user = req.session.user;
    const imageFile = req.files.imageUrl as UploadedFile;

    const imageName = `${Date.now()}--${imageFile.name}`;
    console.log('\x1b[35m%s\x1b[0m', 'neeeesto bilo staaa111111******');

    await imageFile.mv(path.join(__dirname, '../public/') + imageName);
    // await imageFile.mv('./src/public/' + imageName);

    const article = await Article.create({
      name,
      description,
      imageUrl: imageName,
      price,
      inStock,
      gender,
      userId: user.id,
    });

    await Promise.all([
      ...colors.map((id) => article.$add('colors', id)),
      ...sizes.map((id) => article.$add('sizes', id)),
    ]);

    const template = {
      dirname: './src/templates/emailCreateArticle.ejs',
      info: {
        userName: user.firstName,
        articleName: name,
        articlePrice: price,
      },
    };

    mainMailSend(user.email, 'Article confirmation', template);

    return res.status(200).json(article);
  } catch (error) {
    return res.json(error);
  }
};
