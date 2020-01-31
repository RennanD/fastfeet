import axios from 'axios';

class ZipcodeController {
  async show(req, res) {
    const { zipcode } = req.body;

    try {
      // eslint-disable-next-line prettier/prettier
      const formatedZipcode = zipcode.replace('-', '');

      const { data } = await axios.get(
        `http://viacep.com.br/ws/${formatedZipcode}/json/`
      );

      return res.json({
        street: data.logradouro,
        region: data.uf,
        city: data.localidade,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Invalid zipcode' });
    }
  }
}

export default new ZipcodeController();
