import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DashboardController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const order = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city'],
        },
      ],
      attributes: [
        'id',
        'product',
        'status',
        'created_at',
        'canceled_at',
        'start_date',
        'end_date',
      ],
    });

    return res.json(order);
  }

  async show(req, res) {
    const { id, orderId } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const order = await Order.findOne({
      where: {
        deliveryman_id: id,
        id: orderId,
        canceled_at: null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
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

    if (!order) {
      return res.status(400).json({ error: 'This order connot be found.' });
    }

    return res.json(order);
  }
}

export default new DashboardController();
