import * as Yup from 'yup';

import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewOrderMail from '../jobs/NewOrderMail';

import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const { product, page = 1 } = req.query;

    const orders = await Order.findAll({
      where: {
        product: {
          [Op.iLike]: `%${product}%`,
        },
      },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'cancelable',
        'status',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'region'],
        },
      ],
      order: [['created_at', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      where: {
        canceled_at: null,
      },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'city',
            'region',
            'zipcode',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path'],
        },
      ],
    });

    return res.json(order);
  }

  async store(req, res) {
    const { deliverymanId } = req.params;
    const { recipient_id, product } = req.body;

    const schema = Yup.object().shape({
      product: Yup.string().required("The product's name is required"),
      recipient_id: Yup.number('Invalid references to recipient').required(
        'You need inform a recipient'
      ),
    });

    try {
      await schema.validate({
        recipient_id,
        product,
      });

      const deliveryman = await Deliveryman.findByPk(deliverymanId, {
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

      const order = await Order.create({
        deliveryman_id: deliverymanId,
        recipient_id,
        product,
      });

      await Queue.add(NewOrderMail.key, {
        deliveryman,
        recipient,
        order,
      });

      return res.json(order);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const { recipient_id, deliveryman_id } = req.body;

    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    try {
      await schema.validate(req.body);

      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(401).json({ error: 'Order cannot exists.' });
      }

      const recipientExists = await Recipient.findByPk(recipient_id);
      const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

      if (!recipientExists) {
        return res.status(401).json({ error: 'Recipient cannot exists.' });
      }

      if (!deliverymanExists) {
        return res.status(401).json({ error: 'Recipient cannot exists.' });
      }

      if (order.start_date && order.deliveryman_id !== deliveryman_id) {
        return res.status(401).json({
          error:
            ' The order has left for delivery, you cannot change the delivery man',
        });
      }

      await order.update(req.body);

      return res.json(order);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({ error: 'Order cannot exists.' });
    }

    if (!order.cancelable) {
      return res.status(401).json({
        error: 'Orders that have already left for delivery cannot be deleted',
      });
    }

    await order.destroy();

    return res.json({ msg: 'Deleted Successful' });
  }
}
export default new OrderController();
