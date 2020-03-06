import * as Yup from 'yup';

import Order from '../models/Order';

class FinishDeliveryController {
  async update(req, res) {
    const { id, orderId } = req.params;
    const { signature_id } = req.body;

    const schema = Yup.object().shape({
      signature_id: Yup.number().required(
        'You need send a picture from siganture.'
      ),
    });

    try {
      await schema.validate({
        signature_id,
      });

      const delivery = await Order.findOne({
        where: {
          id: orderId,
          deliveryman_id: id,
          canceled_at: null,
        },
      });

      // Check delivery exists
      if (!delivery) {
        return res.status(400).json({ error: 'Delivery cannot found.' });
      }

      // Checks whether the order has been withdrawn for delivery
      if (!delivery.start_date) {
        return res.status(401).json({ error: 'There is no order withdrawal.' });
      }

      await delivery.update({
        signature_id,
        end_date: new Date(),
      });

      return res.json({ msg: 'Finish successful.' });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new FinishDeliveryController();
