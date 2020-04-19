import { Router } from 'express';
import multer from 'multer';

import ordersRoutes from './orders.routes';
import recipientsRoutes from './recipients.routes';
import deliverymenRoutes from './deliverymen.routes';
import deliveriesRoutes from './deliveries.routes';
import problemsRoutes from './problems.routes';

import SessionController from '../app/controllers/SessionController';
import FileController from '../app/controllers/FileController';

import authMiddleware from '../app/middlewares/auth';
import multerConfig from '../config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// Sing In admin in application
routes.post('/sessions', SessionController.store);

// Upload files
routes.post('/files', upload.single('file'), FileController.store);

// Dashboard for Deliveryman
routes.use(deliveriesRoutes);

// CRUD Problems
routes.use(problemsRoutes);

// Authenticate routes
routes.use(authMiddleware);

// Orders CRUD
routes.use(ordersRoutes);

// Recipients CRUD
routes.use(recipientsRoutes);

// Deliverymen CRUD
routes.use(deliverymenRoutes);

export default routes;
