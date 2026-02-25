import { runPerceptionAgent } from './PerceptionAgent';
import { runContextAgent } from './ContextAgent';
import { runLinguisticAgent } from './LinguisticAgent';

export const orchestrateTranslation = async (id: string, filePath: string) => {
    try {
        // Step 1: PERCEPTION (Whisper/Python)
        translationJobs.set(id, { status: 'processing', step: 'Perception Agent' });
        const pData = await runPerceptionAgent(filePath);
        
        // Step 2: CONTEXT (RAG/Weaviate)
        translationJobs.set(id, { ...translationJobs.get(id), step: 'Context Agent' });
        const cData = await runContextAgent(pData.text);

        // Step 3: LINGUISTIC (Gemma Translation)
        translationJobs.set(id, { ...translationJobs.get(id), step: 'Linguistic Agent' });
        const draft = await runLinguisticAgent(pData.text, cData.culturalContext, "English");

        // Step 4: REFINEMENT (Final Polish)
        translationJobs.set(id, { ...translationJobs.get(id), step: 'Refinement Agent' });
        const finalOutput = await runRefinementAgent(draft, "English");

        // DONE
        translationJobs.set(id, { 
            status: 'completed', 
            step: 'Finished', 
            result: finalOutput,
            culturalNotes: cData.allMatches.map(m => m.culturalContext)
        });

    } catch (error) {
        translationJobs.set(id, { status: 'failed', error: error.message });
    }
};