require('dotenv').config();
const express = require('express');
const natural = require('natural');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Load Custom Lexicon
const customLexicon = JSON.parse(fs.readFileSync('./custom-lexicon.json', 'utf8'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// NLP Setup
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");
const tokenizer = new natural.WordTokenizer();

app.post('/analyze', (req, res) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "No text provided" });

    const tokens = tokenizer.tokenize(text.toLowerCase());
    
    // 1. Get Base Sentiment from 'natural'
    const baseScore = analyzer.getSentiment(tokens);

    // 2. Apply Custom Weights
    let customAdjustment = 0;
    tokens.forEach(token => {
        if (customLexicon[token]) {
            customAdjustment += customLexicon[token];
        }
    });

    // Final Weighted Score
    // We normalize the custom adjustment by dividing by token length to keep it consistent with 'natural'
    const finalScore = baseScore + (customAdjustment / tokens.length);

    let status = 'Neutral';
    if (finalScore > 0.2) status = 'Positive';
    if (finalScore < -0.2) status = 'Negative';

    res.json({
        score: finalScore.toFixed(3),
        status: status,
        tokens: tokens,
        customApplied: customAdjustment !== 0
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});