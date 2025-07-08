const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

const router = express.Router();

// 📌 Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role, expertise, bio } = req.body;
  console.log("📥 Registration Request:", req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword, role });

    // Insert into Mentor or Student collection
    if (role === 'mentor') {
      const mentor = new Mentor({
        name,
        email,
        expertise: expertise || 'Not specified',
        bio: bio || 'No bio provided yet.',
      });
      await mentor.save();
      console.log("✅ Mentor Registered:", mentor);
    } else if (role === 'student') {
      const student = new Student({
        name,
        email,
        interests: 'AI/ML', // default value (or make dynamic)
        bio: 'Student at SkillBridge platform.',
      });
      await student.save();
      console.log("✅ Student Registered:", student);
    }

    console.log("✅ User Registered:", user);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
});

// 🔐 Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

module.exports = router;
