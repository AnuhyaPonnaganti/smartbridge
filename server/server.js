// Load environment variables
require('dotenv').config();

// Core packages
const express = require('express');
const http = require('http'); // ✅ required for socket server
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');

// App setup
const app = express();
const server = http.createServer(app); // ✅ create server instance
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
const allowedOrigins = [
  'https://<your-vercel-domain>.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const mentorRoutes = require('./routes/mentor');
const talentRoutes = require('./routes/talent');
const requestRoutes = require('./routes/requestRoutes');
const userProfileRoutes = require('./routes/userProfile');
const userListRoutes = require('./routes/userList');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/talents', talentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/userProfile', userProfileRoutes);
app.use('/api/users', userListRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(5000, () => console.log('🚀 Server running on port 5000'));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// ✅ Socket.IO connection logic
let onlineUsers = {};

io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  // Join user with their ID
  socket.on('join', (userId) => {
    onlineUsers[userId] = socket.id;
    console.log(`👤 User ${userId} joined with socket ${socket.id}`);
  });

  // Handle sending messages
  socket.on('sendMessage', ({ from, to, message }) => {
    const targetSocketId = onlineUsers[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit('receiveMessage', { from, message });
    }
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
    for (const [userId, sockId] of Object.entries(onlineUsers)) {
      if (sockId === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
  });
});
