import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

export const synthesizeResponse = async (query: string, context: any[], intent: any) => {
  const model = new ChatOpenAI({ 
    modelName: "gpt-4-turbo", 
    temperature: 0.7 // Higher temperature for more natural prose
  });

  const contextString = context.map(c => `Source: ${c.source}\nContent: ${c.content}`).join("\n\n");

  const prompt = new PromptTemplate({
    template: `
      You are SynapseSearch-Agent, an expert AI for JS/TS developers.
      
      USER QUERY: {query}
      INTENT: {intent}
      RETRIEVED CONTEXT: 
      {context}

      INSTRUCTIONS:
      1. Synthesize a clear and concise answer based ONLY on the provided context.
      2. Use Markdown for code blocks.
      3. If the context doesn't contain the answer, admit it, but suggest how to find it.
      4. Maintain a professional yet helpful tone for a developer named saadsalmanakram.
      
      FINAL RESPONSE:
    `,
    inputVariables: ["query", "intent", "context"],
  });

  const formattedPrompt = await prompt.format({
    query,
    intent: JSON.stringify(intent),
    context: contextString
  });

  const response = await model.call(formattedPrompt);
  return response.text;

  // Add "history" to the prompt template in synthesisAgent.ts
  const prompt = new PromptTemplate({
    template: `
      Previous Conversation: {history}
    
      Current Context: {context}
    
      User Query: {query}
      ...
    `,
    inputVariables: ["query", "history", "context"],
  });
};