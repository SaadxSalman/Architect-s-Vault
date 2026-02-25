import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import axios from 'axios';

const t = initTRPC.create();

export const appRouter = t.router({
  // This procedure is called by the frontend every few milliseconds
  syncPersonaState: t.procedure
    .input(z.object({
      videoFrame: z.string(), // Base64 image from webcam
      audioSegment: z.string(), // Base64 audio from mic
    }))
    .mutation(async ({ input }) => {
      try {
        // 1. Forward data to the Python Inference Engine (FastAPI)
        const aiResponse = await axios.post('http://inference-engine:5000/analyze', {
          videoFrame: input.videoFrame,
          audioSegment: input.audioSegment,
        });

        const { emotion, suggested_response_tone, gaze_direction } = aiResponse.data;

        // 2. Here you could query your "Massive Multimodal Model" (LLM) 
        // using the 'emotion' as context for the text response.
        
        return {
          status: 'success',
          instructions: {
            expression: emotion, // e.g., "engaged"
            lookAt: gaze_direction, // {x, y}
            textToSpeechTone: suggested_response_tone
          }
        };
      } catch (error) {
        console.error("AI Bridge Error:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to synchronize with AI models',
        });
      }
    }),
});

export type AppRouter = typeof appRouter;