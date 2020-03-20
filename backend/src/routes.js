import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import ZipcodeController from './app/controllers/ZipcodeController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import Ordercontroller from './app/controllers/Ordercontroller';
import DashboardController from './app/controllers/DashboardController';
import DeliveryiesController from './app/controllers/DeliveryiesController';
import FinishDeliveryController from './app/controllers/FinishDeliveryController';
import ProblemsController from './app/controllers/ProblemsController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// Find address by zipcode
routes.post('/zipcode', ZipcodeController.show);

// Sing In admin in application
routes.post('/sessions', SessionController.store);

// Upload files
routes.post('/files', upload.single('file'), FileController.store);

// Dashboard route for deliverymen
routes.get('/deliverymen/:id/orders', DashboardController.index);
routes.get('/deliverymen/:id/orders/:orderId', DashboardController.show);

routes.get('/deliverymen/:deliverymanId', DeliverymanController.show);

// Deliveries from deliverymen
routes.get('/deliverymen/:id/deliveries', DeliveryiesController.index);
routes.put(
  '/deliverymen/:id/deliveries/:orderId',
  DeliveryiesController.update
);
// Finish delivery
routes.put(
  '/deliverymen/:id/deliveries/:orderId/finish',
  FinishDeliveryController.update
);

// Problems routes
routes.post('/delivery/:id/problems', ProblemsController.store);
routes.get('/delivery/:id/problems', DeliveryProblemsController.index);

routes.get('/problems', ProblemsController.index);
routes.get('/problems/:id/', ProblemsController.show);

// Authenticate routes
routes.use(authMiddleware);

// Auth Problem routes
routes.delete('/problems/:id/cancel', ProblemsController.delete);

// CRUD recipients routes
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:recipientId', RecipientController.show);

routes.post('/recipients', RecipientController.store);

routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);

// CRUD deliverymen routes
routes.get('/deliverymen', DeliverymanController.index);

routes.post('/deliverymen', DeliverymanController.store);

routes.put('/deliverymen/:deliverymanId', DeliverymanController.update);
routes.delete('/deliverymen/:deliverymanId', DeliverymanController.delete);

// CRUD orders routes
routes.get('/orders', Ordercontroller.index);
routes.get('/orders/:id', Ordercontroller.show);

routes.post('/orders/:deliverymanId', Ordercontroller.store);

routes.put('/orders/:id', Ordercontroller.update);
routes.delete('/orders/:id', Ordercontroller.delete);

export default routes;
