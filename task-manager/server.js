require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. GLOBAL MIDDLEWARE
app.use(cors()); // Allows frontend to talk to backend
app.use(express.json()); // Parses incoming JSON data (Required for Login/Register)
app.use(express.static(__dirname)); // Serves index.html at http://localhost:3000

// 2. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb')
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 3. INTERNAL IMPORTS
const authMiddleware = require('./middleware/auth');
const Task = require('./models/Task');

// 4. API ROUTES

// Auth Routes (Register/Login)
// This mounts the code from routes/auth.js onto the /api/auth path
app.use('/api/auth', require('./routes/auth'));

// Task Routes (Protected by authMiddleware)
// Get all user tasks
app.get('/api/tasks', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Create a new task
app.post('/api/tasks', authMiddleware, async (req, res) => {
    try {
        const newTask = new Task({ 
            title: req.body.title, 
            userId: req.user.userId 
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: "Error creating task" });
    }
});

// Toggle Task Status
app.patch('/api/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { completed: req.body.completed },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
});

// Delete Task
app.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(400).json({ message: "Delete failed" });
    }
});

// 5. START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📂 Serving static files from: ${__dirname}`);
});