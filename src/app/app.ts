import router from '@routes/main.route';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import fileupload from 'express-fileupload';
import path from 'path';

const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(fileupload());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, 'public')));

  
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'session-secret-key-default',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  app.use('/api', router);
  return app;
};

export default createApp;
