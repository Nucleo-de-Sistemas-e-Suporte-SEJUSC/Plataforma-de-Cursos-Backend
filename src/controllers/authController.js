const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../services/emailService');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validação básica
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios.' });
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Usuário já cadastrado com este e-mail.' });
    }

    const user = await User.create({ username, email, password });

    // Envia o e-mail de boas-vindas de forma assíncrona
    sendWelcomeEmail(user.email, user.username);

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(201).json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      },
    );
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      },
    );
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
