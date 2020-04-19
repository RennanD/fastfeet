import { Router } from 'express';
import RecipientController from '../app/controllers/RecipientController';

const recipientsRoutes = Router();

// CRUD recipients routes
recipientsRoutes.get('/recipients', RecipientController.index);
recipientsRoutes.get('/recipients/:recipientId', RecipientController.show);

recipientsRoutes.post('/recipients', RecipientController.store);

recipientsRoutes.put('/recipients/:recipientId', RecipientController.update);
recipientsRoutes.delete('/recipients/:recipientId', RecipientController.delete);

export default recipientsRoutes;
