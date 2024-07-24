const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_library', 'my_libraryUser', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;