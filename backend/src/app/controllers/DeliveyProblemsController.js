import * as Yup from 'yup';

import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveyProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveryPromblens = await DeliveryProblem.findAll({
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['name', 'street', 'number', 'city', 'region'],
            },
          ],
        },
      ],
      attributes: ['id', 'description'],
      order: [['created_at', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveryPromblens);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryPromblem = await DeliveryProblem.findByPk(id, {
      attributes: ['id', 'description'],
    });

    if (!deliveryPromblem)
      return res.status(400).json({ error: 'Problem not found' });

    return res.json(deliveryPromblem);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const schema = Yup.object().shape({
      description: Yup.string().required('Desciption is required'),
      delivery_id: Yup.number().required('Invalid delivery'),
    });

    try {
      await schema.validate({
        description,
        delivery_id: id,
      });

      const delivery = await Order.findByPk(id);

      if (!delivery) {
        return res.status(401).json({ error: 'Delivery not exists.' });
      }

      const problem = await DeliveryProblem.create({
        delivery_id: id,
        description,
      });

      return res.json(problem);
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    const delivery = await Order.findByPk(problem.delivery_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'city', 'region'],
        },
      ],
    });

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not exists.' });
    }
    // Check if order has already been delivered
    if (delivery.end_date) {
      return res
        .status(401)
        .json({ error: 'the order has already been delivered.' });
    }

    // Check if order has already been canceled
    if (delivery.canceled_at) {
      return res
        .status(401)
        .json({ error: 'the order has already been canceled.' });
    }

    delivery.canceled_at = new Date();

    await Queue.add(CancellationMail.key, {
      deliveryman: delivery.deliveryman,
      recipient: delivery.recipient,
      product: delivery.product,
    });

    await delivery.save();

    return res.json({ msg: 'Canceled successful.' });
  }
}

export default new DeliveyProblemsController();
