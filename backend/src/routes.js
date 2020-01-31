import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import ZipcodeController from './app/controllers/ZipcodeController';

const routes = new Router();

routes.post('/zipcode', ZipcodeController.show);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

export default routes;
