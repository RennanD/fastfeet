import * as Yup from 'yup';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import NewOrderMail from '../jobs/NewOrderMail';

import Queue from '../../lib/Queue';

class OrderController {
  async store(req, res) {
    const { id } = req.params;
    const { recipient_id, product } = req.body;

    const schema = Yup.object().shape({
      product: Yup.string().required(''),
      recipient_id: Yup.number().required(''),
    });

    try {
      await schema.validate({
        recipient_id,
        product,
      });

      const deliveryman = await Deliveryman.findByPk(id, {
        attributes: ['name', 'email'],
      });
      const recipient = await Recipient.findByPk(recipient_id, {
        attributes: ['name', 'street', 'number', 'city', 'region'],
      });

      if (!deliveryman) {
        return res.status(401).json({ error: 'Deliveryman cannot exists' });
      }

      if (!recipient) {
        return res.status(401).json({ error: 'Recipient cannot exists' });
      }

      const orderExists = await Order.findOne({
        where: {
          recipient_id,
          deliveryman_id: id,
        },
      });

      if (orderExists) {
        return res.status(401).json({ error: 'Order already exists.' });
      }

      const order = await Order.create({
        deliveryman_id: id,
        recipient_id,
        product,
      });

      await Queue.add(NewOrderMail.key, {
        deliveryman,
        recipient,
      });

      return res.json(order);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
export default new OrderController();
