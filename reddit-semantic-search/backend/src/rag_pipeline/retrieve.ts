import { client, hf } from '../weaviateClient.js';

export async function performRAGSearch(query: string, collectionName: string) {
  const collection = client.collections.get(collectionName);
  const result = await collection.query.hybrid(query, { limit: 4 });
  const context = result.objects.map(o => o.properties.content).join("\n\n");

  const aiRes = await hf.chatCompletion({
    model: "meta-llama/Llama-3.2-3B-Instruct",
    messages: [
      { 
        role: "system", 
        content: `You are a structured research assistant. Format your response using:
        - ## for main topic headers.
        - ### for sub-sections.
        - Bullet points for lists.
        - **Bold text** for names, dates, or key terms.
        Keep paragraphs short and use whitespace. 
        Base your answer strictly on the provided context.` 
      },
      { role: "user", content: `Context: ${context}\n\nQuestion: ${query}` }
    ],
    max_tokens: 600,
  });

  return {
    answer: aiRes.choices[0].message.content,
    sources: result.objects
  };
}