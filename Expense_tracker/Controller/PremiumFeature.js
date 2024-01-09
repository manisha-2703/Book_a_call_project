const User = require('../Model/user');
const Expense = require('../Model/expense');
const sequelize = require('../util/database');

const getUserLeaderBoard = async (req, res) => {
    try {
        const leaderboardofusers = await User.findAll({
            attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('Expenses.expense')), 'total_cost']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['user.id'],  // Corrected: use the alias 'user.id'
            order: [['total_cost', 'DESC']]
        });

        res.status(200).json(leaderboardofusers);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getUserLeaderBoard
};
