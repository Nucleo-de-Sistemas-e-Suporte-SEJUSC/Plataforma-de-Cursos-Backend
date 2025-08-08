const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração baseada no ambiente
let sequelize;

if (process.env.NODE_ENV === 'test') {
  // Configuração para testes (SQLite em memória)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  });
} else if (process.env.NODE_ENV === 'production' && !process.env.DB_NAME) {
  // Configuração para produção sem banco (para testes de container)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  });
} else {
  // Configuração para desenvolvimento e produção (MySQL)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  );
}

module.exports = sequelize;
