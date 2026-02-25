import { t } from '../trpc'; // assuming you exported 't' from your trpc config
import { z } from 'zod';
import { StudentProfile } from '../../models/StudentProfile';
import { generateTargetedQuiz } from '../../agents/problemAgent';

export const quizRouter = t.router({
  getPersonalizedQuiz: t.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const profile = await StudentProfile.findOne({ userId: input.userId });
      
      if (!profile || profile.knowledgeGaps.length === 0) {
        // Fallback if no gaps are identified yet
        return await generateTargetedQuiz(["General Fundamentals"], {});
      }

      return await generateTargetedQuiz(profile.knowledgeGaps, profile.masteryLevels);
    }),
});