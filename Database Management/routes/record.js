const express = require('express');
const router = express.Router();
const recordController = require('../controllers/record');

// Insert Record
router.post('/:tableName', recordController.insertRecord);

module.exports = router;
