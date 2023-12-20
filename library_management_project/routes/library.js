const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');

router.get('/', libraryController.getBooks);
router.post('/borrow', libraryController.borrowBook);
router.post('/return', libraryController.returnBook);
router.post('/payfine', libraryController.payFine);

module.exports = router;
