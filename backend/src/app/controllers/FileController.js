import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    try {
      const file = await File.create({
        name,
        path,
      });

      return res.json(file);
    } catch (err) {
      return res.json({ error: 'erro' });
    }
  }
}

export default new FileController();
