const Expense = require('../Model/expense');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.addExpense = async (req, res) => {
  const { expense, description, category } = req.body;

  try {
    const newExpense = await Expense.create({ expense, description, category });
    res.json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await Expense.destroy({ where: { id } });
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { expense, description, category } = req.body;

  try {
      const updatedExpense = await Expense.update(
          { expense, description, category },
          { where: { id } }
      );

      res.json(updatedExpense);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};