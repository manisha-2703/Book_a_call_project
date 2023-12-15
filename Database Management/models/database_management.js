// models/database.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Table = sequelize.define('Table', {
  tableName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  columnName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  columnType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Tables', 
});

module.exports = { Table };

