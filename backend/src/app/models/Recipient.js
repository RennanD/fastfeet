import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        region: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Recipient;
