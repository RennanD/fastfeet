import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import { resolve } from 'path';

import 'express-async-errors';

import routes from './routes';

import sentrConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentrConfig);

    this.middlewares();
    this.routes();
    this.execptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  execptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json({ errors });
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
