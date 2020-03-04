import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import User from '../models/User';
import File from '../models/File';

class DeliverymanController {
  async index({ res }) {
    const deliverymen = await Deliveryman.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
      attributes: ['id', 'name', 'email'],
      order: ['id'],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is requirerd'),
      email: Yup.string().required('E-mail is required'),
      avatar_id: Yup.number(),
    });

    try {
      await schema.validate(req.body);

      const userExists = await User.findOne({ where: { email } });

      if (!userExists) {
        return res
          .status(400)
          .json({ error: 'Delivery man already registered.' });
      }

      const deliveryman = await Deliveryman.create(req.body);

      return res.json(deliveryman);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async update(req, res) {
    const { deliverymanId } = req.params;

    const { email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number(),
    });

    try {
      await schema.validate(req.body);

      const deliveryman = await Deliveryman.findByPk(deliverymanId);

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman cannot exists.' });
      }

      if (email && email !== deliveryman.email) {
        const deliverymanExists = await Deliveryman.findOne({
          where: { email },
        });

        if (deliverymanExists) {
          return res.status(401).json({ error: 'This e-mail has been used.' });
        }
      }

      const { id, name } = await deliveryman.update(req.body);

      return res.json({
        id,
        name,
        email,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async delete(req, res) {
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman cannot exists.' });
    }

    await deliveryman.destroy();

    return res.json({ msg: 'Successful deleted.' });
  }
}

export default new DeliverymanController();
