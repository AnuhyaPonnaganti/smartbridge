const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ✅ Correct model

// ✅ GET /api/students/explore/:email — Show all students except current user
router.get('/explore/:email', async (req, res) => {
  try {
    const currentUserEmail = req.params.email;

    const students = await User.find({
      role: "student",
      email: { $ne: currentUserEmail }
    }).select("-password"); // exclude password

    res.status(200).json(students);
  } catch (err) {
    console.error("❌ Error fetching peers:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
