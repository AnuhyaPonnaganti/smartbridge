const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },           // ✅ Corrected from 'contact'
  expertise: { type: String, required: true },
  bio: { type: String, default: 'No bio provided yet.' }  // Optional field for more info
});

module.exports = mongoose.model('Mentor', mentorSchema);
