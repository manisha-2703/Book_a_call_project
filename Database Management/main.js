const sequelize = require('./util/database'); // Adjust the path accordingly
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
  // You can also render an HTML file or perform other actions here
});


app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Routes
const tableRoutes = require('./routes/table');
const recordRoutes = require('./routes/record');

app.use('/tables',tableRoutes);
app.use('/records', recordRoutes);

app.get('/structure/:tableName', async (req, res) => {
  const { tableName } = req.params;

  try {
    // Fetch table structure data using Sequelize or your preferred method
    const table = await sequelize.queryInterface.describeTable(tableName);
    const columns = Object.keys(table);

    res.status(200).json({ columns });
  } catch (error) {
    console.error('Error getting table structure:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync the models with the database
sequelize.sync({ force: false }) // Set force to true if you want to drop and recreate tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error syncing models with the database:', error.message);
  });
