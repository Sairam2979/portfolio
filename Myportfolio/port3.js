const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3004;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  // Extract form data
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Setup nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marganisairam2979@gmail.com',
      pass: 'Margani@nanna2979#',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'marganisairam2979@gmail.com',
    to: 'marganisairam2979@gmail.com',
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Form submitted successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
