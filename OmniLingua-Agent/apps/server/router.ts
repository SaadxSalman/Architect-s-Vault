import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import axios from 'axios';
import { Interaction } from '../packages/database/models/Interaction';

const t = initTRPC.create();

export const appRouter = t.router({
  processContent: t.procedure
    .input(z.object({ 
      text: z.string(), 
      sourceLang: z.string(), 
      targetLang: z.string() 
    }))
    .mutation(async ({ input }) => {
      // 1. Call Python AI Engine
      const pythonResponse = await axios.post('http://localhost:8000/process', {
        text: input.text,
        source_lang: input.sourceLang,
        target_lang: input.targetLang
      });

      const { prompt, context_used } = pythonResponse.data;

      // 2. (Optional) Here you would call your Multimodal Model (GPT/Claude/Gemini)
      // For now, we'll simulate the generated translation
      const finalTranslation = `[Culturally Nuanced] ${input.text} in ${input.targetLang}`;

      // 3. Save the interaction to MongoDB
      const interaction = await Interaction.create({
        userId: "guest_user", // Replace with real Auth ID later
        originalContent: { text: input.text, type: 'text' },
        analysis: { culturalNuances: context_used },
        generatedOutput: { 
            translatedText: finalTranslation, 
            language: input.targetLang 
        }
      });

      return { 
        success: true, 
        translation: finalTranslation, 
        interactionId: interaction._id 
      };
    }),
});