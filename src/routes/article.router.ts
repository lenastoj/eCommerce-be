import {
  addArticle,
  getArticle,
  getArticles,
  searchArticles,
} from '@controlers/article.controller';
import { getColors } from '@controlers/color.controller';
import { getSizes } from '@controlers/size.controller';
import { isAdmin } from '@utils/isAdmin';
import validatorSchema from '@utils/validator';
import articleVlidator from '@validators/article.validator';
import queryValidator from '@validators/query.validator';
import { Router } from 'express';

const articleRouter = Router();

articleRouter.get('/shoes', queryValidator, validatorSchema, getArticles);
articleRouter.get('/shoes/:name', getArticle);
articleRouter.get('/search-shoes', searchArticles);

articleRouter.post(
  '/shoe',
  isAdmin,
  articleVlidator,
  validatorSchema,
  addArticle
);

articleRouter.get('/sizes', getSizes);
articleRouter.get('/colors', getColors);

export default articleRouter;
