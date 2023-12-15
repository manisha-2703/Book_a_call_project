const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require('./routes/database_management');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());
app.use(cors());  
app.use(express.static('public'));

sequelize.authenticate().then(() => {
  console.log('Connected to MySQL database');
}).catch((err) => {
  console.error('Error connecting to MySQL:', err);
});

app.use('/', routes);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
