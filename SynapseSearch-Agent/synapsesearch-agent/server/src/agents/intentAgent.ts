import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

// 1. Define the structure of the intent
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    intent: z.enum(["code_search", "doc_lookup", "debugging", "general_query"]),
    language: z.string().describe("The programming language identified (JS or TS)"),
    confidence: z.number().describe("Confidence score between 0 and 1"),
  })
);

export const classifyIntent = async (query: string) => {
  const model = new ChatOpenAI({ 
    modelName: "gpt-4-turbo", 
    temperature: 0 
  });

  const prompt = new PromptTemplate({
    template: "Analyze the developer query: {query}\n{format_instructions}",
    inputVariables: ["query"],
    partialVariables: { format_instructions: parser.getFormatInstructions() },
  });

  const input = await prompt.format({ query });
  const response = await model.call(input);
  
  return parser.parse(response.text);
};