import { StudentProfile } from '../models/StudentProfile';
import { getRelevantContext } from '../services/vectorStore';
import { ChatOllama } from "@langchain/community/chat_models/ollama";

export const adaptiveTeachingSession = async (userId: string, studentInput: string) => {
  // 1. Fetch Student State from MongoDB
  let profile = await StudentProfile.findOne({ userId });
  if (!profile) {
    profile = await StudentProfile.create({ userId, masteryLevels: {}, knowledgeGaps: [] });
  }

  // 2. Fetch Context from Qdrant
  const context = await getRelevantContext(studentInput);

  // 3. Construct Personalized Prompt
  const model = new ChatOllama({ model: "mixtral", baseUrl: "http://localhost:11434" });

  const systemPrompt = `
    You are an Adaptive Tutor. 
    STUDENT PROFILE:
    - Mastery: ${JSON.stringify(profile.masteryLevels)}
    - Gaps: ${profile.knowledgeGaps.join(", ")}
    - Teaching Style: ${profile.preferredStyle}

    CONTEXT: ${context}

    INSTRUCTIONS:
    Adjust your complexity based on mastery. If the student has a gap in {topic}, 
    explain it using the ${profile.preferredStyle} method.
  `;

  const response = await model.invoke([
    ["system", systemPrompt],
    ["human", studentInput]
  ]);

  // 4. (Optional) Background Task: Update Profile
  // In a real app, you'd run another LLM pass to "extract" new gaps or mastery from this exchange.
  
  return response.content;
};