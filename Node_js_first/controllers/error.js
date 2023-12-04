const path = require('path');

exports.get404 = (req, res, next) => {
    res.status(404).render('404', { path: req.path });
  };
exports.renderPage = (req, res) => {
    res.render('yourView', { pageTitle: 'Your Page Title' });
  };