import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemsController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    try {
      const count = await DeliveryProblem.count();

      const problems = await DeliveryProblem.findAll({
        where: {
          delivery_id: id,
        },
        attributes: ['id', 'delivery_id', 'description', 'created_at'],
        order: [['created_at', 'DESC']],
        limit: 5,
        offset: (page - 1) * 5,
      });

      res.header('X-Total-Count', count);
      return res.json(problems);
    } catch (err) {
      return res.status(400).json({ error: 'Ops, something wrong :(' });
    }
  }
}

export default new DeliveryProblemsController();
