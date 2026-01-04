const router = require('express').Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

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

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Login attempt for: ${username}`); // Debug log

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password does not match" });
        }

        // Generate JWT - with fallback to ensure it doesn't crash if .env fails
        const secret = process.env.JWT_SECRET || 'fallback_secret_saadxsalman';
        
        const token = jwt.sign(
            { userId: user._id }, 
            secret, 
            { expiresIn: '1h' }
        );

        console.log("Login successful, token generated");
        res.json({ token });
        
    } catch (err) {
        console.error("Login Error Details:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router;