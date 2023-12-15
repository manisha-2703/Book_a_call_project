const { Table } = require('../models/database_management');

const showTables = (req, res) => {
  Table.findAll()
    .then(tables => {
      res.json(tables);
    })
    .catch(error => {
      console.error('Error fetching tables:', error);
      res.status(500).send('Internal Server Error');
    });
};


const createTable = (req, res) => {
  const { tableName, columnName, columnType } = req.body;
  Table.create({ tableName, columnName, columnType })
    .then(() => {
      res.status(201).json({ message: 'Table created successfully' });
    })
    .catch(error => {
      console.error('Error creating table:', error);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = {
  showTables,
  createTable,
};
