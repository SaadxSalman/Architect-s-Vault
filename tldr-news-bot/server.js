import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';

dotenv.config();

const app = express();
const hf = new HfInference(process.env.HF_TOKEN);
const MODEL = "meta-llama/Llama-3.2-1B-Instruct";

app.use(express.json());
app.use(express.static('public'));

/**
 * Helper to scrape and clean text from a URL
 */
async function scrapeArticle(url) {
    try {
        const { data } = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
            },
            timeout: 5000 // 5 second timeout
        });
        
        const $ = cheerio.load(data);
        
        // Remove non-content elements to save tokens and improve summary quality
        $('script, style, nav, footer, header, ads, .sidebar, .comments').remove();
        
        // Extract text from paragraph tags
        let text = $('p')
            .map((i, el) => $(el).text())
            .get()
            .join(' ')
            .replace(/\s+/g, ' ') // Clean up extra whitespace
            .trim();
        
        if (!text) throw new Error("Could not find readable content on this page.");

        // Constraint Management: Trim to ~6000 characters to stay within API limits
        return text.substring(0, 6000); 
    } catch (error) {
        console.error("Scraping Error:", error.message);
        throw new Error("Failed to scrape website content.");
    }
}

/**
 * POST /summarize
 * Handles URL input, triggers scraping, and calls Llama 3.2 1B
 */
app.post('/summarize', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const articleText = await scrapeArticle(url);
        
        // Using chatCompletion to satisfy provider requirements (e.g., Novita/Together)
        const response = await hf.chatCompletion({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are a concise news bot. Your goal is to provide a clear, objective summary of the provided text in exactly 3 sentences."
                },
                {
                    role: "user",
                    content: `Please summarize this news article:\n\n${articleText}`
                }
            ],
            max_tokens: 150,
            temperature: 0.7
        });

        // Extract the content from the response object
        const summary = response.choices[0].message.content;
        
        res.json({ 
            success: true,
            summary: summary.trim() 
        });

    } catch (error) {
        console.error("Processing Error:", error.message);
        res.status(500).json({ 
            error: error.message || "An error occurred during summarization." 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 TL;DR Bot is live at http://localhost:${PORT}`);
});