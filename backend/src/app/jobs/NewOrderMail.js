import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'neworder';
  }

  async handle({ data }) {
    const { deliveryman, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'New Order for you!',
      template: 'newOrder',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        address: `${recipient.street}, N° ${recipient.number}, ${recipient.city} - ${recipient.region}`,
      },
    });
  }
}

export default new NewOrderMail();
