require('dotenv').config();
const express = require('express');
const blockchain = require('./blockchain');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Get the full chain
app.get('/api/chain', (req, res) => {
    res.json({
        chain: blockchain.chain,
        isValid: blockchain.isChainValid()
    });
});

// Add a new transaction/block
app.post('/api/mine', (req, res) => {
    const { amount, sender, receiver } = req.body;
    blockchain.addBlock({ amount, sender, receiver });
    res.json({ message: "Block added successfully!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Blockchain running on http://localhost:${PORT}`));