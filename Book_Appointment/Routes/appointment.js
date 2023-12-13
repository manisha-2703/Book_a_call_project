// routes/userRoutes.js
const express = require('express');
const userController = require('../Controller/appointment');
const path = require('path');
const router = express.Router();

router.get('/', userController.getAllUsers);
//router.post('/', userController.getAllUsers);
router.post('/addUser', userController.addUser); // Adjust the route
router.get('/getUser/:id', userController.getUser); // Add this route
router.delete('/deleteUser/:id', userController.deleteUser); // Add this route

module.exports = router;


