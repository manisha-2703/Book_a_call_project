const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table');

// Create Table
router.post('/', tableController.createTable);
router.get('/:tableName', tableController.getTableColumns);
router.get('/', tableController.getAllTables);
//router.get('/structure/:tableName', tableController.getTableStructure); // New route


module.exports = router;
