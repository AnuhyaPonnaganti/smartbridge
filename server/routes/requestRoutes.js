// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema for mentorship requests
const requestSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  mentorEmail: String,
  timestamp: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', requestSchema);

// 📤 POST /api/requests/send — log request
router.post('/send', async (req, res) => {
  try {
    const { studentName, studentEmail, mentorEmail } = req.body;
    const newRequest = new Request({ studentName, studentEmail, mentorEmail });
    await newRequest.save();
    res.status(201).json({ message: 'Request logged successfully' });
  } catch (err) {
    console.error('❌ Error logging request:', err);
    res.status(500).json({ error: 'Logging request failed' });
  }
});

// 📥 GET /api/requests/:mentorEmail — fetch mentor’s received requests
router.get('/:mentorEmail', async (req, res) => {
  try {
    const mentorEmail = req.params.mentorEmail;
    const requests = await Request.find({ mentorEmail }).sort({ timestamp: -1 });
    res.status(200).json(requests);
  } catch (err) {
    console.error('❌ Error fetching requests:', err);
    res.status(500).json({ error: 'Fetching requests failed' });
  }
});

module.exports = router;
