require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder (HTML/CSS)
app.use(express.static('public'));

app.get('/video', (req, res) => {
    // Construct the absolute path to the video file
    const videoPath = path.join(__dirname, 'videos', 'sample.mp4');

    // 1. Safety Check: Ensure the file actually exists
    if (!fs.existsSync(videoPath)) {
        console.error(`[Error] File not found: ${videoPath}`);
        return res.status(404).send("Video file missing in /videos folder.");
    }

    const videoSize = fs.statSync(videoPath).size;
    const range = req.headers.range;

    // 2. Handling non-range requests (initial load or full download)
    if (!range) {
        const head = {
            'Content-Length': videoSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
        return;
    }

    // 3. Handling Range Requests (Streaming/Seeking)
    // Range format: "bytes=12345-"
    const CHUNK_SIZE = 10 ** 6; // 1MB per chunk
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP 206: Partial Content
    res.writeHead(206, headers);

    // 4. Create stream for this specific byte range
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Handle stream errors to prevent server crash
    videoStream.on('error', (err) => {
        console.error("Stream Error:", err);
        res.end(err);
    });

    videoStream.pipe(res);
});

app.listen(PORT, () => {
    console.log(`
🚀 Mini-Netflix Server Running!
-------------------------------
URL: http://localhost:${PORT}
Target File: ./videos/sample.mp4
    `);
});