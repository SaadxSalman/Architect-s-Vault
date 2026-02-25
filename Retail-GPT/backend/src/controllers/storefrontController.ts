import { analyzeUserStyle } from '../agents/stylistAgent';
import { getPersonalizedRecommendations } from '../services/recommendationService';
import { generatePersonalizedCopy } from '../agents/copywriterAgent';

export const createPersonalizedStorefront = async (req: any, res: any) => {
  const { socialText } = req.body;

  // Step 1: Stylist Agent understands the user
  const userProfile = await analyzeUserStyle(socialText);

  // Step 2: Vector Search finds relevant items
  const products = await getPersonalizedRecommendations(userProfile.aesthetic);

  // Step 3: Copywriter Agent creates custom descriptions for each item
  const personalizedProducts = await Promise.all(
    products.map(async (product: any) => {
      const customCopy = await generatePersonalizedCopy(
        { name: product.name, baseDescription: product.description },
        userProfile
      );
      
      return {
        ...product,
        personalizedDescription: customCopy,
        themeColor: userProfile.colorPalette[0] // Injecting brand colors
      };
    })
  );

  res.json({
    userProfile,
    storefrontItems: personalizedProducts
  });
};