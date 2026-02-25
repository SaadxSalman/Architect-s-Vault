import { initTRPC } from '@trpc/server';
import { z } from 'zod';
// This refers to the compiled Rust binary via NAPI-RS
import { processAndIndexScientificPaper } from '../../../core-engine'; 

const t = initTRPC.create();

export const paperRouter = t.router({
  // Procedure to handle paper ingestion
  ingestPaper: t.procedure
    .input(
      z.object({
        filePath: z.string(),
        collectionName: z.string().default('bio-lit-collection'),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Calling the Rust function directly
        await processAndIndexScientificPaper(input.collectionName, input.filePath);
        return { success: true, message: "Paper indexed successfully in Qdrant." };
      } catch (error) {
        throw new Error(`Rust Core Error: ${error}`);
      }
    }),
});

export const paperRouter = t.router({
  // ... previous ingestPaper mutation ...

  askQuestion: t.procedure
    .input(z.object({ question: z.string() }))
    .query(async ({ input }) => {
      // 1. Retrieve relevant scientific snippets from Rust/Qdrant
      const contexts = await searchRelevant_context("bio-lit-collection", input.question, 3);

      // 2. Construct the RAG Prompt
      const prompt = `
        Use the following scientific context to answer the question.
        Context: ${contexts.join("\n\n")}
        Question: ${input.question}
        Answer:
      `;

      // 3. Send to your Fine-Tuned LLM (using an Inference API or local Ollama)
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({ model: "biolit-llama3", prompt }),
      });

      return response.json();
    }),
});

export type AppRouter = typeof paperRouter;

