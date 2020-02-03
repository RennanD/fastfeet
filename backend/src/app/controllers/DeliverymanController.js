import Deliveryman from '../models/Deliveryman';
import User from '../models/User';

class DeliverymanController {
  async store(req, res) {
    const { email } = req.body;

    const userExists = User.findOne({ where: { email } });

    if (!userExists) {
      return res
        .status(400)
        .json({ error: 'Delivery man already registered.' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
