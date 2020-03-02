export default {
  host: '',
  port: process.env.MAIL_HOST,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe FastFeet <contato@fastfeet.com.br>',
  },
};
