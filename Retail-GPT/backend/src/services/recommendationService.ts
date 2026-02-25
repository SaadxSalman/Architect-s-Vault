import { client } from './vectorStore';

export const getPersonalizedRecommendations = async (aesthetic: string) => {
  const result = await client.graphql
    .get()
    .withClassName('ProductStyle')
    .withFields('aesthetic styleTags')
    .withNearText({
      concepts: [aesthetic],
      certainty: 0.7
    })
    .withLimit(5)
    .do();

  return result.data.Get.ProductStyle;
};