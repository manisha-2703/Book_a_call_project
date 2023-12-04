const path = require('path');

exports.getContactDetails =  (req, res, next) => {
    res.render('contactus', {
        pageTitle: 'Contact Us',
        path: '/contactus'
    });
};

exports.postSuccess = (req, res, next) => {
    // Handle form submission, save data, etc.
    res.redirect('/success');
};

exports.getSucess = (req, res, next) => {
    res.send('Form successfully filled');
};