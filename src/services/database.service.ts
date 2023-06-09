import { Sequelize } from 'sequelize-typescript';
import User from '@models/user.model';
import Article from '@models/article.model';
import Color from '@models/color.model';
import Size from '@models/size.model';
import { ArticleSize } from '@models/articleSize.model';
import { ArticleColor } from '@models/articleColor.model';
import Cart from '@models/cart.model';
import { CartArticle } from '@models/cartArticle.model';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    sequelize.addModels([User, Article, Color, Size, ArticleColor, ArticleSize, Cart, CartArticle]);
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
