import { Sequelize } from 'sequelize-typescript';
import User from '@models/user.model';

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
    sequelize.addModels([User]);
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
