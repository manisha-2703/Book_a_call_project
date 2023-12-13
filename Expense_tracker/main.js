const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Model/expense');
const sequelize = require('./util/database');

const expenseRoutes = require('./Routes/expense');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/expenses', expenseRoutes);  // Use the correct path for your expenses routes

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
