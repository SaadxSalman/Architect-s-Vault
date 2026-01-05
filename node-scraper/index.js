require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    let browser;
    try {
        const url = process.env.TARGET_URL || 'https://www.bbc.com/news/technology';
        
        // 1. Launch a headless browser
        browser = await puppeteer.launch({ 
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });

        const page = await browser.newPage();

        // 2. Set a convincing User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // 3. Navigate to the URL
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { 
            waitUntil: 'networkidle2', // Wait until the network is quiet
            timeout: 60000 
        });

        // 4. Get the full rendered HTML
        const html = await page.content();
        const $ = cheerio.load(html);
        const articles = [];

        // 5. Parse the data
        // Target BBC headlines (specifically looking for their link/heading structure)
        $('a').each((i, el) => {
            const title = $(el).find('h2, span').text().trim();
            const link = $(el).attr('href');

            if (title && title.length > 15 && link && link.includes('/news/')) {
                const fullLink = link.startsWith('http') ? link : `https://www.bbc.com${link}`;
                
                // Avoid duplicates and limit to 12
                if (!articles.find(a => a.title === title) && articles.length < 12) {
                    articles.push({ title, link: fullLink });
                }
            }
        });

        await browser.close();
        res.render('index', { articles });

    } catch (error) {
        if (browser) await browser.close();
        console.error("Scraping Error:", error.message);
        res.render('index', { 
            articles: [], 
            error: "The site is heavily protected or slow. Try refreshing or checking the URL." 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Scraping Target: ${process.env.TARGET_URL}`);
});