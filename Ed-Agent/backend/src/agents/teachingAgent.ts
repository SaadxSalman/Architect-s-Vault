import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { getRelevantContext } from "../services/vectorStore";
import { PromptTemplate } from "@langchain/core/prompts";

export const teachingAgentWithContext = async (studentQuestion: string) => {
  const model = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "mixtral",
  });

  // 1. Retrieve facts from Qdrant
  const context = await getRelevantContext(studentQuestion);

  // 2. Inject context into the prompt
  const template = `
    You are a personalized tutor. Use the following pieces of retrieved context 
    to answer the student's question accurately. If the context doesn't contain 
    the answer, use your general knowledge but mention you are doing so.

    Context: {context}

    Question: {question}
    
    Tutor Response:`;

  const prompt = PromptTemplate.fromTemplate(template);
  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    context: context,
    question: studentQuestion,
  });

  return response.content;
};