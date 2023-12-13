// util/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('book_appointment', 'root', 'manisha@123', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;

const User = require('../Model/appointment');
sequelize.sync();
