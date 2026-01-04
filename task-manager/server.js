require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. GLOBAL MIDDLEWARE
app.use(cors()); 
app.use(express.json()); 
app.use(express.static(__dirname)); // Serves your index.html

// 2. DATABASE CONNECTION
// Ensure your .env has MONGO_URI, otherwise it defaults to local
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb')
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 3. API ROUTES
// We mount the external route files here to keep this file clean.
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/tasks', require('./routes/tasks'));

// 4. FALLBACK ROUTE
// Directs any other requests to your frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 5. START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔑 JWT_SECRET status: ${process.env.JWT_SECRET ? 'SET' : 'MISSING'}`);
});