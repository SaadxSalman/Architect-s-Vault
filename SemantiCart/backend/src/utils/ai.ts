import { TRPCError } from '@trpc/server';
import { openai } from '../lib/clients';

const embeddingCache: Record<string, number[]> = {};

export async function getVector(text: string): Promise<number[]> {
  const cleanText = text.toLowerCase().trim();
  
  if (embeddingCache[cleanText]) {
    console.log(`[CACHE HIT] Using existing embedding for: "${cleanText}"`);
    return embeddingCache[cleanText];
  }

  try {
    console.log(`[AI LOG] Generating embedding for: "${cleanText}"`);
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: cleanText,
    });

    const vector = response.data[0].embedding;
    embeddingCache[cleanText] = vector;
    return vector;
  } catch (error: any) {
    if (error.status === 429) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'AI Rate limit exceeded. Please wait.',
      });
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to generate embedding',
    });
  }
}