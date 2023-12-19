const { QueryTypes } = require('sequelize');
const sequelize = require('../util/database');

// Create Table
exports.createTable = async (req, res) => {
  const { tableName, columns } = req.body;

  try {
    const tableColumns = {};
    columns.forEach(column => {
      tableColumns[column.name] = {
        type: sequelize.Sequelize[column.type],
        allowNull: true,
      };
    });

    // Create a dynamic model for the table
    const DynamicTable = sequelize.define(tableName, tableColumns);
    
    // Sync the model to the database
    await DynamicTable.sync();

    res.status(201).json({ message: `Table "${tableName}" created successfully!` });
  } catch (error) {
    console.error('Error creating table:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Table Columns
exports.getTableColumns = async (req, res) => {
  const { tableName } = req.params;

  try {
    const table = await sequelize.queryInterface.describeTable(tableName);
    const columns = Object.keys(table);

    res.status(200).json({ columns });
  } catch (error) {
    console.error('Error getting table columns:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All Tables
 exports.getAllTables = async (req, res) => {
  try {
    const tables = await sequelize.query('SHOW TABLES', { type: QueryTypes.SELECT });
    const tableNames = tables.map(table => table[`Tables_in_${sequelize.config.database}`]);
    
    res.status(200).json({ tables: tableNames });
  } catch (error) {
    console.error('Error getting tables:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTableStructure = async (req, res) => {
    const { tableName } = req.params;
  
    try {
      const table = await sequelize.queryInterface.describeTable(tableName);
      const columns = Object.keys(table);
  
      res.status(200).json({ columns });
    } catch (error) {
      console.error('Error getting table structure:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };