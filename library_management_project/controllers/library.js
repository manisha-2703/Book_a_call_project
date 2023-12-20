const Book = require('../models/book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.sendFile('index.html', { root: '/public' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { title } = req.body;
  try {
    const book = await Book.create({ title, borrowedAt: new Date() });
    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { title } = req.body;
  try {
    const book = await Book.findOne({ where: { title } });

    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

    const borrowedTime = new Date(book.borrowedAt);
    const currentTime = new Date();
    const hoursDiff = Math.floor((currentTime - borrowedTime) / (60 * 60 * 1000));

    // Simplified: Charge 10 Rupees per hour
    const fine = hoursDiff > 1 ? (hoursDiff - 1) * 10 : 0;

    book.returnedAt = currentTime;
    book.fine = fine;
    await book.save();

    res.json({ success: true, fine });
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
      // Process payment (you may want to integrate a payment system here)
      // For simplicity, we just set fine to 0
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
