import express from 'express';
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// CPU-Intensive Route
app.get('/calculate/:n', (req, res) => {
  const n = parseInt(req.params.n);

  if (isNaN(n) || n < 0) {
    return res.status(400).json({ error: 'Please provide a valid positive number.' });
  }

  // Create a new worker
  const worker = new Worker('./fib-worker.js', {
    workerData: { n }
  });

  worker.on('message', (result) => {
    res.json({ n, result, thread: 'Worker Thread' });
  });

  worker.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

  worker.on('exit', (code) => {
    if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});