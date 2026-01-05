require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    let browser;
    try {
        // Use the URL from .env, or a default if .env is not set
        const url = process.env.TARGET_URL || 'https://news.ycombinator.com/';
        
        // 1. Launch a headless browser
        browser = await puppeteer.launch({ 
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });

        const page = await browser.newPage();

        // 2. Set a convincing User-Agent to avoid blocks
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // 3. Navigate to the URL
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { 
            waitUntil: 'networkidle2', 
            timeout: 60000 
        });

        // 4. Get the rendered HTML and load it into Cheerio
        const html = await page.content();
        const $ = cheerio.load(html);
        const articles = [];

        // 5. UNIVERSAL PARSING LOGIC
        // We look for anchor tags <a> that likely contain headlines.
        $('a').each((i, el) => {
            // Get text from the link or its immediate children (like h2, h3, or spans)
            const title = $(el).text().trim();
            const link = $(el).attr('href');

            // VALIDATION: 
            // - Title must be long enough to be a headline (not "Home" or "Next")
            // - Link must exist
            if (title && title.length > 15 && link) {
                // Ensure the link is a full URL
                let fullLink = link;
                if (!link.startsWith('http')) {
                    const urlObj = new URL(url);
                    fullLink = `${urlObj.protocol}//${urlObj.hostname}${link.startsWith('/') ? '' : '/'}${link}`;
                }
                
                // Avoid duplicates and limit to 15 results
                if (!articles.find(a => a.title === title) && articles.length < 15) {
                    articles.push({ title, link: fullLink });
                }
            }
        });

        await browser.close();

        // If no articles found, provide a helpful message
        if (articles.length === 0) {
            return res.render('index', { 
                articles: [], 
                error: `Successfully reached the site, but couldn't find headlines. Try a different TARGET_URL in your .env.` 
            });
        }

        res.render('index', { articles });

    } catch (error) {
        if (browser) await browser.close();
        console.error("Scraping Error:", error.message);
        res.render('index', { 
            articles: [], 
            error: `Error: ${error.message}. Make sure your TARGET_URL is correct.` 
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔎 Scraping Target: ${process.env.TARGET_URL || 'Hacker News (Default)'}\n`);
});