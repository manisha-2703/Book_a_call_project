const path = require('path');
const express = require('express');
const expenseController = require('../Controller/expense');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.addExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
