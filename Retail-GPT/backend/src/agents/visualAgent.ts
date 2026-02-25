// backend/src/agents/visualAgent.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateProductImage = async (productName: string, aesthetic: string) => {
  // Use a model that supports image generation
  const model = ai.getGenerativeModel({ model: "imagen-3.0-generate-002" });

  const prompt = `
    A high-end professional commercial photograph of ${productName}.
    The scene is styled in a ${aesthetic} aesthetic.
    Lighting: Soft natural light, high-resolution details, 8k, professional studio quality.
    Background: An environment that perfectly matches a ${aesthetic} lifestyle.
    No text, no watermarks.
  `;

  const result = await model.generateImages({
    prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: "1:1",
    },
  });

  // Returns the base64 image data
  return result.generatedImages[0].image.imageBytes;
};