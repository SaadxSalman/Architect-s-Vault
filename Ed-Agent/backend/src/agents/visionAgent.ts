import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { HumanMessage } from "@langchain/core/messages";

export const analyzeHandwrittenWork = async (base64Image: string) => {
  // Use a vision model like 'llava'
  const visionModel = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llava", // Ensure you've run `ollama pull llava`
  });

  const response = await visionModel.invoke([
    new HumanMessage({
      content: [
        { type: "text", text: "Analyze this student's handwritten math work. Identify any calculation errors or conceptual misunderstandings." },
        {
          type: "image_url",
          image_url: `data:image/jpeg;base64,${base64Image}`,
        },
      ],
    }),
  ]);

  return response.content;
};