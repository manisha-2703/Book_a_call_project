const axios = require('axios');
const SENDINBLUE_API_KEY = 'xsmtpsib-868d14b2c8f3ec54ead6c0bf82d15093e2949c6e91a7c3893ce06147635dd6ce-BGsIpXxbjyOT3QtE';

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Create a dummy email and send it using Sendinblue API
  try {
    const response = await axios.post(
      'https://api.sendinblue.com/v3/smtp/email',
      {
        sender: { name: 'Manisha', email: 'mandlipallimanisha123@gmail.com' },
        to: [{ email: email }],
        subject: 'Password Reset',
        textContent: 'Click the link to reset your password: http://your-frontend-url/reset-password',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': SENDINBLUE_API_KEY,
        },
      }
    );

    // Handle success, maybe send a response to the frontend
    console.log(response.data);
    res.json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    // Handle error, maybe send an error response to the frontend
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
