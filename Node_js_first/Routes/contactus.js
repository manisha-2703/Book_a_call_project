const path=require('path');

const express= require('express');
const rootDir=require('../util/path');
const router = express.Router();

router.get('/contactus', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'Views', 'contactus.html'));
});

router.post('/contactus', (req, res, next) => {
    // Handle form submission, save data, etc.
    res.redirect('/success');
});

router.get('/success', (req, res, next) => {
    res.send('Form successfully filled');
});

module.exports = router;
