const express = require('express');
const Talent = require('../models/Talent');
const { upload } = require('../utils/cloudinary');
const router = express.Router();

// Upload a new talent
router.post('/upload', upload.single('media'), async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file received. Check field name 'media'." });
    }

    const mediaUrl = req.file.path;

    const talent = await Talent.create({ title, description, userId, mediaUrl });
    res.status(201).json(talent);
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(400).json({ error: 'Failed to upload talent', details: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const talents = await Talent.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email role'); // student info
    const formatted = talents.map(t => ({
      title: t.title,
      description: t.description,
      fileUrl: t.mediaUrl,
      studentName: t.userId?.name,
      studentEmail: t.userId?.email
    }));
    res.json(formatted);
  } catch (err) {
    console.error("❌ Fetch talents error:", err);
    res.status(500).json({ error: 'Failed to fetch talents' });
  }
});


module.exports = router;
