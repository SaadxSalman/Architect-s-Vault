import { WeaviateStore } from "@langchain/weaviate";
import { OpenAIEmbeddings } from "@langchain/openai";
import weaviate, { WeaviateClient } from "weaviate-client";

// Connect to Weaviate Cloud or Local instance
const weaviateClient: WeaviateClient = weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL!, 
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ""),
    headers: {
      "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY!,
    },
  }
);

const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
});

export const getVectorStore = async () => {
  return new WeaviateStore(embeddings, {
    client: weaviateClient,
    indexName: "Codebase", // Must be capitalized
    textKey: "content",
    metadataKeys: ["source", "language", "type"],
  });
};