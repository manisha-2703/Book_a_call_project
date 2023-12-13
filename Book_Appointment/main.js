// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoutes = require('./Routes/appointment');

const app = express();

app.use(bodyParser.json());

app.use(cors());
// Serve static files from the 'public' directory
app.use(express.static('public'));


app.use(userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Sequelize sync error:', err);
  });

