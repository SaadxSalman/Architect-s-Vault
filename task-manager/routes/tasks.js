const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Apply auth middleware to all task routes
router.use(auth);

router.get('/', async (req, res) => {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const newTask = new Task({ ...req.body, userId: req.user.userId });
    await newTask.save();
    res.json(newTask);
});

module.exports = router;