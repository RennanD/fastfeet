import { Router } from 'express';
import ProblemsController from '../app/controllers/ProblemsController';
import DeliveryProblemsController from '../app/controllers/DeliveryProblemsController';

import authMiddleware from '../app/middlewares/auth';

const problemsRoutes = Router();

// Problems routes
problemsRoutes.post('/delivery/:id/problems', ProblemsController.store);
problemsRoutes.get('/delivery/:id/problems', DeliveryProblemsController.index);

problemsRoutes.get('/problems', ProblemsController.index);
problemsRoutes.get('/problems/:id/', ProblemsController.show);

// Auth Problem routes
problemsRoutes.delete(
  '/problems/:id/cancel',
  authMiddleware,
  ProblemsController.delete
);

export default problemsRoutes;
