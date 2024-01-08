const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./util/database');
const expenseRoutes = require('./Routes/expense');
const userRoutes = require('./Routes/user');
const purchaseRoutes = require('./Routes/purchase');
const app = express();

app.use(express.json());

const Expense = require('./Model/expense');
const User = require('./Model/user');
const Order=require('./Model/orders')

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);
app.use('/purchase',purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User); 

User.hasMany(Order);
Order.belongsTo(User);


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