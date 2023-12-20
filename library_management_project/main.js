const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const libraryRouter = require('./routes/library');
const sequelize = require('./util/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up static files
app.use(express.static('public'));

// Set view engine
app.get('/library', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Use the library router
app.use(libraryRouter);

// Sync the models to the database
sequelize.sync();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
