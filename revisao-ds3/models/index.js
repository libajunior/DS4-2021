const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

// Carrega os models existentes 1 a 1
sequelize.User = sequelize.import('./user.js');

// Sincronize/crie o banco de dados
sequelize.sync();

module.exports = sequelize;