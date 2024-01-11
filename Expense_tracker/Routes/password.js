const express = require('express');
const userController = require('../Controller/password');

const router = express.Router();

router.post('/forgotpassword', userController.forgotPassword);

module.exports = router;
