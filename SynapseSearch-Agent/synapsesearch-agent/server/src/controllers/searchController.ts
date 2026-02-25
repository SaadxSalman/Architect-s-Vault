import { Request, Response } from 'express';
import { classifyIntent } from '../agents/intentAgent';
import { performRetrieval } from '../agents/retrievalAgent';
import { synthesizeResponse } from '../agents/synthesisAgent';

export const handleSearchQuery = async (req: Request, res: Response) => {
  try {
    const { userQuery } = req.body;

    // Step 1: Brain (Intent)
    const intent = await classifyIntent(userQuery);

    // Step 2: Hands (Retrieval)
    const context = await performRetrieval(userQuery, intent.intent);

    // Step 3: Voice (Synthesis)
    const finalAnswer = await synthesizeResponse(userQuery, context, intent);

    res.json({
      answer: finalAnswer,
      sources: context.map(c => c.source),
      metadata: { intent: intent.intent, confidence: intent.confidence }
    });
  } catch (error) {
    console.error("Workflow Error:", error);
    res.status(500).json({ error: "Cognitive engine encountered an error." });
  }
};