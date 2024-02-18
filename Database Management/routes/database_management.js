const express = require('express');
const router = express.Router();
const tableController = require('../controllers/database_management');

router.get('/api/tables', tableController.showTables);

router.post('/api/tables', tableController.createTable);

module.exports = router;
