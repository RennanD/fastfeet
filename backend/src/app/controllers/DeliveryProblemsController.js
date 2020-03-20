import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemsController {
  async index(req, res) {
    const { id } = req.params;

    try {
      const problems = await DeliveryProblem.findAll({
        where: {
          delivery_id: id,
        },
        attributes: ['id', 'delivery_id', 'description', 'created_at'],
      });

      return res.json(problems);
    } catch (err) {
      return res.status(400).json({ error: 'Ops, something wrong :(' });
    }
  }
}

export default new DeliveryProblemsController();
