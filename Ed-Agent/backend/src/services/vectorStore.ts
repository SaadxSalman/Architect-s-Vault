import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Document } from "@langchain/core/documents";

// Initialize the embedding model (must match the dimensions of your Qdrant collection)
const embeddings = new OllamaEmbeddings({
  model: "mixtral", 
  baseUrl: "http://localhost:11434",
});

const vstoreConfig = {
  url: process.env.QDRANT_URL || "http://127.0.0.1:6333",
  collectionName: "educational_material",
};

// Function to add educational content to the vector store
export const addDocumentsToStore = async (texts: string[], metadatas: object[]) => {
  const docs = texts.map((text, i) => new Document({ pageContent: text, metadata: metadatas[i] }));
  
  return await QdrantVectorStore.fromDocuments(docs, embeddings, vstoreConfig);
};

// Function to search for relevant context
export const getRelevantContext = async (query: string) => {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, vstoreConfig);
  
  // Search for the top 3 most relevant snippets
  const results = await vectorStore.similaritySearch(query, 3);
  return results.map(r => r.pageContent).join("\n\n");
};