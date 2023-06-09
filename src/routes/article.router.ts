import {
  addArticle,
  getArticle,
  getArticles,
} from '@controlers/article.controller';
import { getColors } from '@controlers/color.controller';
import { getSizes } from '@controlers/size.controller';
import { isAdmin } from '@utils/isAdmin';
import validatorSchema from '@utils/validator';
import articleVlidator from '@validators/article.validator';
import { Router } from 'express';

const articleRouter = Router();

articleRouter.get('/shoes', getArticles);
articleRouter.get('/shoes/:name', getArticle);
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
