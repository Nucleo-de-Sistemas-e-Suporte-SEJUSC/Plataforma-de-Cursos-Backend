const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');

// Definir relacionamentos aqui para evitar dependências circulares
// User.belongsToMany(Course, { through: 'Enrollments' });
// Course.belongsToMany(User, { through: 'Enrollments' });

module.exports = {
  sequelize,
  User,
  Course,
};
