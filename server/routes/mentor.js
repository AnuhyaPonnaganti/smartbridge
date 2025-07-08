const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const Talent = require('../models/Talent'); // Make sure this model exists and is imported
const User = require('../models/User');     // To fetch student info

// ✅ Get all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Register a new mentor
router.post('/register', async (req, res) => {
  const { name, expertise, contact } = req.body;

  if (!name || !expertise || !contact) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const mentor = new Mentor({ name, expertise, contact });
    await mentor.save();
    res.status(201).json({ message: 'Mentor registered successfully', mentor });
  } catch (err) {
    res.status(500).json({ error: 'Error registering mentor' });
  }
});

// ✅ Get a mentor by ID
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching mentor' });
  }
});

// ✅ NEW: Get all student talent submissions (for mentor dashboard)
router.get('/submissions', async (req, res) => {
  try {
    const talents = await Talent.find().populate('userId', 'name email');
    const formatted = talents.map(t => ({
      id: t._id,
      title: t.title,
      description: t.description,
      fileUrl: t.fileUrl,
      studentName: t.userId?.name,
      studentEmail: t.userId?.email
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions', details: err.message });
  }
});

module.exports = router;
