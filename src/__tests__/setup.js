// Configuração global para testes
process.env.NODE_ENV = 'test';

// Carregar variáveis de ambiente de teste
require('dotenv').config({ path: '.env.test' });

// Configurações de timeout para testes
jest.setTimeout(10000);

// Mock do console para evitar logs durante testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Configuração do banco de dados de teste
const sequelize = require('../config/database');

// Sincronizar modelos com o banco de teste
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Limpar dados após cada teste
afterEach(async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});

// Fechar conexão após todos os testes
afterAll(async () => {
  await sequelize.close();
});
