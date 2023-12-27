const User = require('../Model/user');

exports.signup = async (req, res) => {
  const { name , email, password } = req.body;

  try {
    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
