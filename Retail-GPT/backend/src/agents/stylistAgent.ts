// backend/src/agents/stylistAgent.ts
import { gemmaClient } from '../services/aiService'; 

export const analyzeUserStyle = async (rawSocialData: string) => {
  const prompt = `
    Analyze the following social media data and extract a fashion profile.
    Data: "${rawSocialData}"
    
    Return ONLY a JSON object with these keys:
    - aesthetic: (e.g., "minimalist", "cyberpunk", "vintage bohemian")
    - colorPalette: (list of 3 hex codes or names)
    - keyVibe: (a 1-sentence summary of their style)
  `;

  const response = await gemmaClient.generate(prompt);
  return JSON.parse(response); 
};