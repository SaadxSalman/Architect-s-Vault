const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// This applies the JWT check to ALL routes in this file
router.use(auth);

// GET: Fetch only the tasks belonging to the logged-in user
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Could not fetch tasks" });
    }
});

// POST: Create a task linked to the logged-in user
router.post('/', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            userId: req.user.userId // Extracted from the JWT by the middleware
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: "Failed to create task" });
    }
});

// PATCH: Update a task (Security check: must belong to the user)
router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { completed: req.body.completed },
            { new: true }
        );
        
        if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
});

// DELETE: Remove a task (Security check: must belong to the user)
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.user.userId 
        });

        if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Delete failed" });
    }
});

module.exports = router;