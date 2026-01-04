const router = require('express').Router();
const User = require('../models/User'); // Check this path!
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// This becomes /api/auth/register because of the prefix in server.js
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "User Created" });
    } catch (err) {
        res.status(400).json({ message: "Registration failed." });
    }
});

// This becomes /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;