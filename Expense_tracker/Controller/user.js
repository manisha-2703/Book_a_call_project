const User = require('../Model/user');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
      // Check if the email already exists
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
          return res.status(400).json({ error: 'User already exists. Please log in.' });
      }

      // Create a new user
      const newUser = await User.create({ name, email, password });
      res.json(newUser);
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ where: { email } });

        if (user) {
            // Compare provided password with the stored password
            if (password === user.password) {
                res.json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
