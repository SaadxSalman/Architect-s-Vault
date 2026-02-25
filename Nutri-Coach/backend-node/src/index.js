const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Simple Auth Middleware
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) { res.status(401).send(); }
};

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(5000, () => console.log("Node Auth Server on 5000"));
});