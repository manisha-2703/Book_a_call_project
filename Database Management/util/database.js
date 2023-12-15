const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_management', 'root', 'manisha@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
