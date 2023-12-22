const Book = require('../models/book');
const { Op } = require('sequelize');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { title } = req.body;
  try {
    const borrowedAt = new Date();

    const returnedToBe = new Date(borrowedAt);
    returnedToBe.setHours(returnedToBe.getHours() + 1);
    /* const currentTime = new Date();
    const hoursDiff = Math.floor((currentTime - borrowedAt) / (60 * 60 * 1000));

    const fine = hoursDiff > 1 ? (hoursDiff - 1) * 10 : 0; */

    const book = await Book.create({ title, borrowedAt, returnedToBe ,fine});
    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { id } = req.body;
  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

     const borrowedTime = new Date(book.borrowedAt);
    const returnedToBe = new Date(borrowedTime);
    returnedToBe.setHours(returnedToBe.getHours() + 1);

    const currentTime = new Date();
    const hoursDiff = Math.floor((currentTime - borrowedTime) / (60 * 60 * 1000));

    const fine = hoursDiff > 1 ? (hoursDiff - 1) * 10 : 0;
 
    book.returnedAt = currentTime;
    book.fine = fine;
    book.returnedToBe = returnedToBe;

    await book.save();  // Save changes to the database

    res.json({ success: true, fine, returnedToBe });  // Include returnedToBe in the response
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getBorrowedBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        borrowedAt: {
          [Op.ne]: null, // books that have been borrowed
        },
        returnedAt: null, // books that have not been returned
      },
    });

    res.json({ success: true, books: Array.isArray(books) ? books : [] });  // Ensure books is an array
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getReturnedBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        borrowedAt: {
          [Op.ne]: null, // books that have been borrowed
        },
        returnedAt: {
          [Op.ne]: null, // books that have been returned
        },
      },
    });

    res.json({ success: true, books: Array.isArray(books) ? books : [] });  // Ensure books is an array
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.payFine = async (req, res) => {
  const { id } = req.body;
  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

    if (book.fine > 0) {
      book.fine = 0;
      await book.save();

      res.json({ success: true, message: 'Fine paid successfully' });
    } else {
      res.json({ success: false, error: 'No fine to pay' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
