const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  returnedToBe: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fine: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Book;

