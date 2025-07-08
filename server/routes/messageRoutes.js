const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/:senderId/:receiverId', async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { from: senderId, to: receiverId },
        { from: receiverId, to: senderId }
      ]
    }).sort({ createdAt: 1 }); // oldest to newest
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;
