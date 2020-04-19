import { Router } from 'express';

import DashboardController from '../app/controllers/DashboardController';
import DeliveryiesController from '../app/controllers/DeliveryiesController';
import DeliverymanController from '../app/controllers/DeliverymanController';
import FinishDeliveryController from '../app/controllers/FinishDeliveryController';

const deliveriesRoutes = Router();

// Dashboard route for deliverymen
deliveriesRoutes.get('/deliverymen/:id/orders', DashboardController.index);
deliveriesRoutes.get(
  '/deliverymen/:id/orders/:orderId',
  DashboardController.show
);

deliveriesRoutes.get('/deliverymen/:deliverymanId', DeliverymanController.show);

// Deliveries from deliverymen
deliveriesRoutes.get(
  '/deliverymen/:id/deliveries',
  DeliveryiesController.index
);
deliveriesRoutes.put(
  '/deliverymen/:id/deliveries/:orderId',
  DeliveryiesController.update
);
// Finish delivery
deliveriesRoutes.put(
  '/deliverymen/:id/deliveries/:orderId/finish',
  FinishDeliveryController.update
);

export default deliveriesRoutes;
