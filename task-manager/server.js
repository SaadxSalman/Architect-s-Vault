require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allows your HTML file to talk to this server

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection Error:", err));

// Models
const User = require('./models/User');
const Task = require('./models/Task');
const auth = require('./middleware/auth');

// --- Routes ---

// Auth Routes
app.use('/api/auth', require('./routes/auth'));

// Task Routes
app.get('/api/tasks', auth, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
});

app.post('/api/tasks', auth, async (req, res) => {
    const newTask = new Task({ ...req.body, userId: req.user.userId });
    await newTask.save();
    res.json(newTask);
});

// Toggle Task Status
app.patch('/api/tasks/:id', auth, async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        { completed: req.body.completed },
        { new: true }
    );
    res.json(task);
});

// Delete Task
app.delete('/api/tasks/:id', auth, async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));