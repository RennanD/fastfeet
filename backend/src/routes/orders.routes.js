import { Router } from 'express';

import Ordercontroller from '../app/controllers/Ordercontroller';

const orderRoutes = Router();

// CRUD orders routes
orderRoutes.get('/orders', Ordercontroller.index);
orderRoutes.get('/orders/:id', Ordercontroller.show);

orderRoutes.post('/orders/:deliverymanId', Ordercontroller.store);

orderRoutes.put('/orders/:id', Ordercontroller.update);
orderRoutes.delete('/orders/:id', Ordercontroller.delete);

export default orderRoutes;
