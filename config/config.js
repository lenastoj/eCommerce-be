require('dotenv').config();
// import dotenv from 'dotenv';

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
