const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const libraryRouter = require('./routes/library');
const sequelize = require('./util/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/library', libraryRouter);

sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
