const { Sequelize } = require('sequelize');
const db = new Sequelize('database_management', 'root', 'manisha@123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = db;

