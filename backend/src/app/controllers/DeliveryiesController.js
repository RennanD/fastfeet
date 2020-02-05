import { Op } from 'sequelize';

import {
  setHours,
  setSeconds,
  setMinutes,
  startOfHour,
  format,
  startOfDay,
  endOfDay,
  parseISO,
} from 'date-fns';

import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

import rangeHour from '../../utils/rangeHour';

class DeliveriesController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Delivery man not found.' });
    }

    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'zipcode'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const { id, orderId } = req.params;

    // Check is date/hour is available for withdrawn.
    const available = rangeHour.map(range => {
      const [hour, minute] = range.split(':');
      const value = setSeconds(
        setMinutes(setHours(new Date(), hour), minute),
        0
      );

      return {
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      };
    });

    const start_date = {
      value: format(startOfHour(new Date()), "yyyy-MM-dd'T'HH:mm:ssxxx"),
    };

    const withdrawnAvailable = available.find(
      a => a.value === start_date.value
    );

    if (!withdrawnAvailable) {
      return res
        .status(401)
        .json({ error: 'You cannot pick up orders outside business hours.' });
    }

    // Check if you have already made 5 withdrawals a day.
    const deliveries = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
        deliveryman_id: id,
      },
    });

    if (deliveries.length >= 5) {
      return res
        .status(401)
        .json({ error: 'You cannot withdraw only 5 orders per day' });
    }

    // Check if order has already left for delivery.
    const inDelivery = await Order.findOne({
      where: {
        id: orderId,
        deliveryman_id: id,
        start_date: parseISO(start_date.value),
      },
    });

    if (inDelivery) {
      return res
        .status(401)
        .json({ error: 'The order has already left for delivery' });
    }

    const delivery = await Order.findByPk(orderId);

    // Check if order exists.
    if (!delivery) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    await delivery.update({
      start_date: parseISO(start_date.value),
    });

    return res.json({ msg: 'Order withdrawn!' });
  }
}

export default new DeliveriesController();
