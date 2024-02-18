const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser'); // Import body-parser
const router = express.Router();

const filePath = 'messages.txt';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head><title> My First Page</title></head>');
        res.write('<body><form action="/messages" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('<h2>Messages:</h2>');
        res.write('<pre>' + data + '</pre>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    });
});

router.post('/', (req, res) => {
    const message = req.body.message; // Use req.body to access form data

    fs.appendFile(filePath, message + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Message written to file');
        res.writeHead(302, { 'Location': '/messages' });
        res.end();
    });
});

module.exports = router;



