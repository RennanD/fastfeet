import { Router } from 'express';

import DeliverymanController from '../app/controllers/DeliverymanController';

const deliverymenRoutes = Router();

// CRUD deliverymen routes
deliverymenRoutes.get('/deliverymen', DeliverymanController.index);

deliverymenRoutes.post('/deliverymen', DeliverymanController.store);

deliverymenRoutes.put(
  '/deliverymen/:deliverymanId',
  DeliverymanController.update
);
deliverymenRoutes.delete(
  '/deliverymen/:deliverymanId',
  DeliverymanController.delete
);

export default deliverymenRoutes;
