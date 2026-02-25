// backend/src/agents/copywriterAgent.ts
import { gemmaClient } from '../services/aiService';

interface ProductInfo {
  name: string;
  baseDescription: string;
}

interface UserProfile {
  aesthetic: string;
  keyVibe: string;
}

export const generatePersonalizedCopy = async (product: ProductInfo, user: UserProfile) => {
  const prompt = `
    You are an expert fashion copywriter. 
    Write a compelling, short product description for a user with a "${user.aesthetic}" aesthetic.
    The user's vibe is: "${user.keyVibe}".
    
    Product: ${product.name}
    Original Details: ${product.baseDescription}
    
    Instruction: Use language that resonates with the ${user.aesthetic} subculture. 
    Keep it under 60 words. Do not use generic sales fluff.
  `;

  const personalizedText = await gemmaClient.generate(prompt);
  return personalizedText.trim();
};