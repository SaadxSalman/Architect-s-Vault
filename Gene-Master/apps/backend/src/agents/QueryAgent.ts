import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

// Define the structured schema the agent MUST follow
const querySchema = z.object({
  target_genes: z.array(z.string()).describe("List of gene symbols identified"),
  analysis_type: z.enum(["frequency", "correlation", "distribution"]),
  filters: z.object({
    min_age: z.number().optional(),
    ethnicity: z.string().optional(),
  }),
  privacy_epsilon: z.number().describe("Differential privacy budget (0.1 to 1.0)"),
});

export class QueryAgent {
  private model: ChatOpenAI;
  private parser: StructuredOutputParser<typeof querySchema>;

  constructor() {
    this.model = new ChatOpenAI({ modelName: "gpt-4o", temperature: 0 });
    this.parser = StructuredOutputParser.fromZodSchema(querySchema);
  }

  async translate(userInput: string) {
    const formatInstructions = this.parser.getFormatInstructions();
    
    const prompt = new PromptTemplate({
      template: "You are a Genomic Privacy Expert.\n{format_instructions}\nUser Query: {user_input}",
      inputVariables: ["user_input"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const input = await prompt.format({ user_input: userInput });
    const response = await this.model.call([input]);
    
    // This structured JSON will be passed to the Computation Agent
    return await this.parser.parse(response.content);
  }
}