const path = require('path');
const express = require('express');
const expenseController = require('../Controller/expense');
const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticatemiddleware.authenticate, expenseController.getAllExpenses);
router.post('/', authenticatemiddleware.authenticate, expenseController.addExpense);
router.put('/:id', authenticatemiddleware.authenticate, expenseController.updateExpense);
router.delete('/:id', authenticatemiddleware.authenticate, expenseController.deleteExpense);

module.exports = router;