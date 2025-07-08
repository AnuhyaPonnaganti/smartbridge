const express = require('express');
const User = require('../models/User'); // Your Mongoose model
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id name email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
