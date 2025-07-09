const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
const nodemailer = require('nodemailer');

const router = express.Router();

// ✅ Update basic user profile (name, email)
router.put('/update/:id', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed', details: err.message });
  }
});

// ✅ Update student-specific fields (bio, interests)
router.put('/student-profile/:email', async (req, res) => {
  const { bio, interests } = req.body;
  try {
    const student = await Student.findOneAndUpdate(
      { email: req.params.email },
      { bio, interests },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Student profile update failed', details: err.message });
  }
});

// ✅ Reset password using user ID
router.put('/reset-password/:id', async (req, res) => {
  const { newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashed });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Password reset failed', details: err.message });
  }
});

// ✅ Optional: Reset password using email
router.put('/reset-password/email/:email', async (req, res) => {
  const { newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { password: hashed },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'Password updated via email' });
  } catch (err) {
    res.status(500).json({ error: 'Password reset by email failed', details: err.message });
  }
});

// ✅ Send reset link to user's email
router.post('/send-reset-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetLink = `https://smartbridge-nine.vercel.app/reset-password/${user._id}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'SkillBridge Password Reset',
      html: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <br/><br/>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset email sent. Check your inbox!' });
  } catch (err) {
    console.error('❌ Email send failed:', err);
    res.status(500).json({ error: 'Could not send reset email', details: err.message });
  }
});

module.exports = router;
