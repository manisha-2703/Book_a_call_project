const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

// Function to dynamically generate model columns
const generateColumns = (dynamicColumns) => {
  const columns = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // Add standard columns here if needed
  };

  // Add dynamic columns based on user input
  dynamicColumns.forEach(column => {
    columns[column.name] = {
      type: DataTypes[column.type.toUpperCase()],
      allowNull: true, // You can customize this based on your requirements
      // Add other column options as needed
    };
  });

  // Add createdAt and updatedAt columns
  columns.createdAt = {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Provide a default value
  };

  columns.updatedAt = {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  };

  return columns;
};

const DynamicTable = (dynamicColumns) => {
  return sequelize.define('DynamicTable', generateColumns(dynamicColumns), {
    // Enable timestamps (createdAt, updatedAt)
    timestamps: true,
    // You can customize other model options here
  });
};

module.exports = DynamicTable;