import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

const quizParser = StructuredOutputParser.fromZodSchema(
  z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.string(),
      explanation: z.string(),
      difficulty: z.string(),
    })
  )
);

export const generateTargetedQuiz = async (gaps: string[], mastery: any) => {
  const model = new ChatOllama({
    model: "mixtral",
    temperature: 0.8, // Slightly higher for creative problem variation
  });

  const formatInstructions = quizParser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `
      You are an Assessment Expert. Create a 3-question quiz to help a student improve.
      
      STUDENT WEAKNESSES: {gaps}
      CURRENT MASTERY: {mastery}

      {format_instructions}
      
      Ensure questions are practical and increase in difficulty.
    `,
    inputVariables: ["gaps", "mastery"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const input = await prompt.format({ 
    gaps: gaps.join(", "), 
    mastery: JSON.stringify(mastery) 
  });
  
  const response = await model.invoke(input);
  return await quizParser.parse(response.content as string);
};