const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./util/database');
const expenseRoutes = require('./Routes/expense');
const userRoutes = require('./Routes/user');
const purchaseRoutes = require('./Routes/purchase');
const premiumRoutes=require('./Routes/premiumFeature');
const passwordRoutes=require('./Routes/password');
const app = express();
const dotenv = require('dotenv');
// get config vars
dotenv.config();

app.use(express.json());

const Expense = require('./Model/expense');
const User = require('./Model/user');
const Order=require('./Model/orders');
const Forgotpassword=require('./Model/password');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',passwordRoutes);


User.hasMany(Expense);
Expense.belongsTo(User); 

User.hasMany(Order);
Order.belongsTo(User);

Forgotpassword.belongsTo(User);
User.hasMany(Forgotpassword);


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