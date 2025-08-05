const { Sequelize } = require('sequelize');

// Configuração específica para testes
const testDatabase = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Banco em memória para testes
  logging: false, // Desabilita logs durante testes
  define: {
    timestamps: true,
    underscored: true,
  },
});

module.exports = testDatabase;
