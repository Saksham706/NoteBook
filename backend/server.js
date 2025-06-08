const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const folderRoutes = require('../routes/folderRoutes');
const noteRoutes = require('../routes/noteRouter');
const userRoutes = require('../routes/userRoutes');

const app = express();

// MongoDB connection cache
let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
};

// CORS setup with support for multiple origins
app.use(cors({
  origin: process.env.FRONTEND_URL.split(','),
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/folders', folderRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/auth', userRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Main handler for Vercel
module.exports = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
