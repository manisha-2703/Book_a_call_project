// controllers/userController.js
const Appointment = require('../Model/appointment');

exports.getAllUsers = (req, res, next) => {
  Appointment.findAll()
    .then((appointments) => {
      res.json({
        success: true,
        data: appointments,
        message: 'List of Appointments',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });
};

exports.addUser = (req, res, next) => {
  const { name, email, phone, dateTime, time } = req.body;

  Appointment.create({
    name: name,
    email: email,
    phone: phone,
    dateTime: new Date(dateTime),
    time: time,
  })
    .then((result) => {
      console.log('Appointment created successfully');
      res.json({ success: true, message: 'Appointment created successfully' });
    })
    .catch((err) => {
      console.error('Error creating appointment:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  Appointment.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user, message: 'User details retrieved successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  Appointment.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      return user.destroy();
    })
    .then((result) => {
      console.log('DESTROYED USER');
      res.json({ success: true, message: 'User deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });
};
