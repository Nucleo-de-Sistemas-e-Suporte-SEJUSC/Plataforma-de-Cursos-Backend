const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

// Importa as rotas
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

// Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Database health check
app.get('/health/db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'OK',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, _next) => {
  if (process.env.NODE_ENV !== 'production') {
    // Em desenvolvimento, você pode usar um logger adequado aqui
  }
  res.status(500).json({
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong!'
        : err.message,
  });
});

// Inicia a conexão e o servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV !== 'production') {
      // Conexão com MySQL bem-sucedida
    }

    await sequelize.sync(); // Sincroniza os modelos. Use { force: true } para recriar as tabelas (cuidado, apaga dados!)
    if (process.env.NODE_ENV !== 'production') {
      // Modelos sincronizados com o banco de dados
    }

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, '0.0.0.0', () => {
        if (process.env.NODE_ENV !== 'production') {
          // Servidor rodando na porta ${PORT}
        }
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // Não foi possível conectar ao banco de dados
    }
    // Em produção, relança o erro para o Docker detectar
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
};

// Inicia o servidor apenas se não estiver em modo de teste
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
