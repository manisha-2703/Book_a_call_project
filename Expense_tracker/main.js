const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./util/database');
const expenseRoutes = require('./Routes/expense');
const userRoutes = require('./Routes/user');
const app = express();

app.use(bodyParser.json());

const Expense = require('./Model/expense');
const User = require('./Model/user');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User); 

sequelize.sync()
    .then(() => {
        return User.findByPk(1);
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
