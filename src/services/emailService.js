const transporter = require('../config/mailer');
require('dotenv').config();

/**
 * Envia um e-mail de boas-vindas para o novo usuário.
 * @param {string} userEmail - O e-mail do destinatário.
 * @param {string} userName - O nome do usuário.
 */
exports.sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
    to: userEmail,
    subject: 'Bem-vindo(a) à nossa Plataforma de Cursos!',
    html: `
      <h1>Olá, ${userName}!</h1>
      <p>Seja muito bem-vindo(a) à nossa plataforma.</p>
      <p>Estamos muito felizes em ter você conosco. Explore nossos cursos e comece a aprender hoje mesmo!</p>
      <br>
      <p>Atenciosamente,</p>
      <p>Equipe da Plataforma de Cursos</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`E-mail de boas-vindas enviado para ${userEmail}`);
  } catch (error) {

    console.error(`Erro ao enviar e-mail de boas-vindas para ${userEmail}:`, error);
  }
};
