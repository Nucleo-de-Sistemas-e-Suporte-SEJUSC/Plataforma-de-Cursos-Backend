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

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Inicia a conexão e o servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com MySQL bem-sucedida.');

        await sequelize.sync(); // Sincroniza os modelos. Use { force: true } para recriar as tabelas (cuidado, apaga dados!)
        console.log('Modelos sincronizados com o banco de dados.');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
};

startServer();