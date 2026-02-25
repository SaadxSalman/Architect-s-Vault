import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

// 1. Define the schema for the learning path
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    studentName: z.string(),
    overallGoal: z.string(),
    modules: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
        estimatedTime: z.string(),
        keyTopics: z.array(z.string()),
      })
    ),
  })
);

export const generateCurriculum = async (studentInfo: string) => {
  const model = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "mixtral",
    temperature: 0, // Lower temperature for structured planning
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: 
      "You are an expert Education Architect.\n{format_instructions}\n" +
      "Create a personalized learning path based on this student profile: {studentInfo}",
    inputVariables: ["studentInfo"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const input = await prompt.format({ studentInfo });
  const response = await model.invoke(input);
  
  // Parse the string response into a typed JSON object
  return await parser.parse(response.content as string);
};