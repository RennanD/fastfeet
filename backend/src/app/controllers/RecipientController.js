import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { name, page = 1 } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: ['id', 'name', 'number', 'street', 'city', 'region'],
      order: [['created_at', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { recipientId } = req.params;

    const recipient = await Recipient.findByPk(recipientId, {
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'city',
        'region',
        'zipcode',
      ],
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient cannot exists.' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      zipcode: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
      region: Yup.string().required(),
    });

    try {
      await schema.validate(req.body);
      const recipient = await Recipient.create(req.body);

      return res.json(recipient);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    const { recipientId } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      zipcode: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      city: Yup.string(),
      region: Yup.string(),
    });

    try {
      await schema.validate(req.body);

      const recipient = await Recipient.findByPk(recipientId);

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient cannot exists.' });
      }

      await recipient.update(req.body);

      return res.json(recipient);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new RecipientController();
