const Expense = require('../Model/expense');
const User = require('../Model/user');
const sequelize = require('../util/database');

exports.getAllExpenses = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
const parsedPageSize = parseInt(pageSize, 10) || 10; // Ensure it's parsed as an integer, default to 10 if not a valid number

try {
  const expenses = await Expense.findAll({
    where: { UserId: req.user.id },
    limit: parsedPageSize,
    offset: (page - 1) * parsedPageSize,
  });

  res.json(expenses);
} catch (error) {
  console.error('Error fetching expenses:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
};

exports.addExpense = async (req, res) => {
  const { expense, description, category } = req.body;
  console.log('Received expense data:', { expense, description, category });

  let t; 

  try {
    t = await sequelize.transaction(); 

    const newExpense = await Expense.create(
      { expense, description, category, UserId: req.user.id },
      { transaction: t }
    );
    console.log('New expense created:', newExpense);

    const userId = req.user.id;
    const totalExpenses = await Expense.sum('expense', { where: { UserId: userId }, transaction: t });

    await User.update({ totalExpenses }, { where: { id: userId }, transaction: t });

    await t.commit(); 

    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    if (t) await t.rollback();
    res.status(500).json(err);
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  let t;

  try {
    t = await sequelize.transaction();

    const deletedExpense = await Expense.findByPk(id, { transaction: t });

    await Expense.destroy({ where: { id }, transaction: t });

    const userId = req.user.id;
    const totalExpenses = await Expense.sum('expense', { where: { UserId: userId }, transaction: t });

    await User.update({ totalExpenses }, { where: { id: userId }, transaction: t });

    await t.commit();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    if (t) await t.rollback();
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
