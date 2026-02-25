import { getVectorStore } from "../services/vectorStore";

export const performRetrieval = async (query: string, intent: string) => {
  const vectorStore = await getVectorStore();
  
  // Adjust alpha based on intent
  // If debugging, lean more towards exact keyword matches
  const alphaValue = intent === "debugging" ? 0.3 : 0.6;

  const results = await vectorStore.hybridSearch(query, {
    alpha: alphaValue,
    limit: 4,
  });

  return results.map(doc => ({
    content: doc.pageContent,
    source: doc.metadata.source,
    type: doc.metadata.type
  }));
};