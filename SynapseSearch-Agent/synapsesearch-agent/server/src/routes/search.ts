import { Router } from 'express';
import { classifyIntent } from '../agents/intentAgent';
import { performRetrieval } from '../agents/retrievalAgent';

const router = Router();

router.post('/query', async (req, res) => {
  const { userQuery } = req.body;

  // 1. Intent Analysis
  const classification = await classifyIntent(userQuery);

  // 2. Focused Retrieval
  const context = await performRetrieval(userQuery, classification.intent);

  res.json({
    intent: classification.intent,
    retrievedData: context,
    message: "Context gathered successfully."
  });
});