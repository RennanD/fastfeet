import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'cancelation';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada.',
      template: 'cancellation',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        address: `${recipient.street}, N° ${recipient.number}, ${recipient.city} - ${recipient.region}`,
        product,
      },
    });
  }
}

export default new CancellationMail();
