import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return !this.start_date;
          },
        },
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            let status = 'PENDENTE';

            if (this.canceled_at) {
              status = 'CANCELADA';
            }

            if (!this.canceled_at && this.start_date) {
              if (this.end_date) {
                status = 'ENTREGUE';
              } else {
                status = 'RETIRADA';
              }
            }

            return status;
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Order;
