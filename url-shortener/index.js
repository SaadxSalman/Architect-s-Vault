require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Url = require('./models/Url');

const app = express();
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('DB Connection Error:', err));

// Route 1: Create a Short URL
app.post('/shorten', async (req, res) => {
    const { fullUrl } = req.body;

    if (!fullUrl) return res.status(400).json({ error: 'URL is required' });

    const shortUrl = nanoid(7); // Generates a unique 7-character string
    const newUrl = await Url.create({ fullUrl, shortUrl });

    res.json({ 
        message: 'URL shortened successfully',
        shortUrl: `http://localhost:3000/${shortUrl}` 
    });
});

// Route 2: Redirect Logic
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const urlData = await Url.findOne({ shortUrl });

    if (urlData) {
        urlData.clicks++;
        await urlData.save();
        return res.redirect(urlData.fullUrl);
    } else {
        return res.status(404).json('URL not found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));