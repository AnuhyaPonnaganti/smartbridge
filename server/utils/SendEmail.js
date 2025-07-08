// utils/sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendResetEmail = async (toEmail, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const resetLink = `http://localhost:5173/confirm-reset/${token}`;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: '🔐 Reset Your SkillBridge Password',
    html: `
      <h3>Hello!</h3>
      <p>You requested to reset your SkillBridge password.</p>
      <p>Click the link below to reset it:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
