const fs = require('fs/promises');
const path = require('path');
const { marked } = require('marked');
const browserSync = require('browser-sync').create();
require('dotenv').config();

const CONTENT_DIR = path.join(__dirname, 'content');
const DIST_DIR = path.join(__dirname, process.env.OUTPUT_DIR || 'dist');
const TEMPLATE_PATH = path.join(__dirname, 'templates', 'layout.html');

async function build() {
    try {
        // 1. Ensure dist folder exists
        await fs.mkdir(DIST_DIR, { recursive: true });

        // 2. Read layout and content
        const layout = await fs.readFile(TEMPLATE_PATH, 'utf-8');
        const files = await fs.readdir(CONTENT_DIR);
        
        for (const file of files) {
            if (!file.endsWith('.md')) continue;

            const filePath = path.join(CONTENT_DIR, file);
            const rawContent = await fs.readFile(filePath, 'utf-8');
            const htmlContent = marked.parse(rawContent);

            const finalHtml = layout
                .replace('{{title}}', file.replace('.md', '').toUpperCase())
                .replace('{{content}}', htmlContent)
                .replace('{{site_title}}', process.env.SITE_TITLE);

            const fileName = file.replace('.md', '.html');
            await fs.writeFile(path.join(DIST_DIR, fileName), finalHtml);
        }
        console.log(`[${new Date().toLocaleTimeString()}] ✔ Build Successful`);
        
        // Reload browser if browser-sync is running
        if (browserSync.active) {
            browserSync.reload();
        }
    } catch (error) {
        console.error('Build Error:', error);
    }
}

// Check for --watch flag
if (process.argv.includes('--watch')) {
    build().then(() => {
        browserSync.init({
            server: DIST_DIR,
            port: 3000,
            notify: false
        });

        // Watch for changes in content or templates
        const { watch } = require('fs');
        watch(CONTENT_DIR, { recursive: true }, () => build());
        watch(path.join(__dirname, 'templates'), { recursive: true }, () => build());
        
        console.log('👀 Watching for changes in /content and /templates...');
    });
} else {
    build();
}