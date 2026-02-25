import express from 'express';
import { analyzeUserStyle } from '../agents/stylistAgent';
import { getPersonalizedRecommendations } from '../services/recommendationService';

const router = express.Router();

router.post('/generate-storefront', async (req, res) => {
  const { socialText } = req.body;

  // 1. Stylist Agent analyzes the person
  const styleProfile = await analyzeUserStyle(socialText);

  // 2. Vector Search finds matching aesthetics
  const recommendations = await getPersonalizedRecommendations(styleProfile.aesthetic);

  res.json({
    profile: styleProfile,
    products: recommendations
  });
});

export default router;