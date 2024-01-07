const path = require('path');
const express = require('express');
const userController = require('../Controller/user');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;