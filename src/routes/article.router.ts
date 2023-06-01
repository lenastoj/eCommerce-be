import {addArticle, getArticle, getArticles} from '@controlers/article.controller';
import { isAuth } from '@utils/isAuth';
import validatorSchema from '@utils/validator';
import articleVlidator from '@validators/article.validator';
import { Router } from 'express';

const articleRouter = Router();

articleRouter.get('/shoes', getArticles);
articleRouter.get('/shoes/:name', getArticle);
articleRouter.post('/create-shoe', isAuth, articleVlidator, validatorSchema, addArticle);




export default articleRouter;
