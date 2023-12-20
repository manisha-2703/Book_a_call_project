const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  borrowedAt: {
    type: DataTypes.DATE,
  },
  returnedAt: {
    type: DataTypes.DATE,
  },
  fine: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Book;
