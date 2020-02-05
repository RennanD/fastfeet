import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: ['id', 'name', 'zipcode'],
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
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
      return res.status(400).json({ error: err.messege });
    }
  }
}

export default new RecipientController();
