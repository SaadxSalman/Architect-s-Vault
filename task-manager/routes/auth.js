const router = require('express').Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration Route: /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const user = new User({ username, password });
        await user.save();
        
        res.status(201).json({ message: "User Created Successfully" });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
});

// Login Route: /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // 3. Generate JWT
        // We use 'userId' because your middleware looks for req.user.userId
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router;