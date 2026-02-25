import { runLinguisticAgent } from './LinguisticAgent';
import { client } from '../services/weaviate';

export const runRefinementAgent = async (initialTranslation: string, targetLang: string) => {
  // 1. Double-check for regional authenticity
  const validationSearch = await client.graphql
    .get()
    .withClassName('OmniLingua_SEA')
    .withFields('refinedPhrasing')
    .withNearText({ concepts: [initialTranslation] })
    .withLimit(1)
    .do();

  const suggestedRefinement = validationSearch.data.Get.OmniLingua_SEA[0]?.refinedPhrasing;

  // 2. The "Critic" Prompt
  const criticPrompt = `
    You are the Refinement Agent. Review the following translation:
    " ${initialTranslation} "

    Suggested authentic phrasing from database: "${suggestedRefinement || 'None'}"

    Task:
    - If the translation is already perfect, return it as is.
    - If the suggested phrasing is more culturally resonant for ${targetLang}, merge them.
    - Ensure the tone is natural and not 'robotic'.
    
    Return ONLY the final polished text.
  `;

  // Call the LLM one last time for the polish
  const response = await axios.post('YOUR_LLM_ENDPOINT', {
    model: "gemma-7b-it-omnilingua",
    messages: [{ role: "user", content: criticPrompt }],
    temperature: 0.2, // Very low for consistency
  });

  return response.data.choices[0].message.content;
};