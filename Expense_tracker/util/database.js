// util/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'manisha@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
