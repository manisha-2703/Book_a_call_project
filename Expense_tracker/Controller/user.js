const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists. Please log in.' });
        }

        // Generate a salt and hash the password
        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = await User.create({ name, email, password: hashedPassword });
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

        if (!user) {
            // User not found
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passwords match, generate a token
            const token = jwt.sign({ userId: user.id }, 'adsdsfxfhsgtfhfyhjfyjftxr', { expiresIn: '1h' });

            // Send the token in the response
            res.json({ token, user });
        } else {
            // Passwords don't match
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};