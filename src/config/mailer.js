const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usando o serviço do Gmail
  host: 'smtp.gmail.com', // Host do Gmail
  port: 465,
  secure: true, // true para 465
  auth: {
    user: process.env.MAIL_USER, // Seu e-mail do Gmail
    pass: process.env.MAIL_PASS, // Sua senha de aplicativo do Gmail
  },
});

module.exports = transporter;
