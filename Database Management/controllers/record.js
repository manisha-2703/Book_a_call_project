const sequelize = require('../util/database');

// Function to dynamically define Sequelize model for a table
function defineDynamicModel(tableName, columns) {
  return sequelize.define(tableName, columns);
}

// Function to insert a record
exports.insertRecord = async (req, res) => {
  const { tableName } = req.params;
  console.log(`Received POST request to /records/${tableName}`);

  try {
    // Check if the table exists in Sequelize models
    const dynamicTable = defineDynamicModel(tableName, req.body.columns);

    // Sync the model to the database
    await dynamicTable.sync();

    // Get the values from the request body
    const { values } = req.body;

    // Insert the record into the dynamic table
    await dynamicTable.create(values);

    console.log('Record inserted successfully!');
    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    console.error('Error inserting record:', error.message);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({ validationErrors });
    } else {
      // Handle other errors with a 500 status code
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
