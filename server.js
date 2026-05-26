require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MongoDB Contact Schema
const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  subject:   { type: String, required: true, trim: true },
  message:   { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now },
  read:      { type: Boolean, default: false }
});

const Contact = mongoose.model('Contact', contactSchema);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// ── API ROUTES ──────────────────────────────────────

// POST /api/contact — save message to DB
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (message.length < 10) {
      return res.status(400).json({ error: 'Message too short.' });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    console.log(`📩 New message from ${name} <${email}>`);
    res.status(201).json({ success: true, message: 'Message saved successfully!' });

  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/messages — view all messages (admin)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ timestamp: -1 });
    res.json({ count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── START SERVER ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running at http://localhost:${PORT}`);
});

module.exports = app;
