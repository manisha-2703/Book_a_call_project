const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <form action="/login/setUsername" method="POST">
            <input type="text" name="username" id="username">
            <button type="submit">Login</button>
        </form>
    `);
});

router.post('/setUsername', (req, res) => {
    const { username } = req.body;
    console.log(username);

    // Redirect to the messages page
    res.redirect('/messages');
});

module.exports = router;


