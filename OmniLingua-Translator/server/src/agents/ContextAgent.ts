import { client } from '../services/weaviate';

export const runContextAgent = async (transcribedText: string) => {
  try {
    // Perform Hybrid Search
    const result = await client.graphql
      .get()
      .withClassName('OmniLingua_SEA')
      .withFields('originalText culturalContext idiomaticMeaning region')
      .withHybrid({
        query: transcribedText,
        alpha: 0.5, // 0.5 balances Vector (semantic) and BM25 (keyword)
      })
      .withLimit(2) // Get the top 2 most relevant cultural matches
      .do();

    const matches = result.data.Get.OmniLingua_SEA;

    if (matches.length === 0) {
      return {
        culturalContext: "No specific idiomatic match found. Proceeding with standard context.",
        nuances: []
      };
    }

    // Format the findings for the next agent (Linguistic Agent)
    return {
      culturalContext: matches[0].culturalContext,
      idiomMatch: matches[0].idiomaticMeaning,
      allMatches: matches
    };
  } catch (error) {
    console.error("Context Agent Error:", error);
    throw new Error("Failed to retrieve cultural context");
  }
};