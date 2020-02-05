import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import ZipcodeController from './app/controllers/ZipcodeController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import Ordercontroller from './app/controllers/Ordercontroller';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/zipcode', ZipcodeController.show);

routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:deliverymanId', DeliverymanController.update);
routes.delete('/deliverymen/:deliverymanId', DeliverymanController.delete);

routes.get('/orders', Ordercontroller.index);
routes.get('/orders/:id', Ordercontroller.show);
routes.post('/orders/:deliverymanId', Ordercontroller.store);
routes.put('/orders/:id', Ordercontroller.update);
routes.delete('/orders/:id', Ordercontroller.store);

export default routes;
