import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { codeSnippet } = req.body;
  // Trigger Rust process or call Rust RPC service
  res.json({ status: "analyzing", intent: "refactor" });
});

app.listen(5000, () => console.log('Synapse-360 API running on port 5000'));