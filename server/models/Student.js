const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  interests: {
    type: String,
    default: 'Not specified',
  },
  bio: {
    type: String,
    default: 'No bio provided.',
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Student', studentSchema);
