import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

const products = [
  {
    name: "Geometric Ceramic Vase",
    description: "A matte finish ceramic vase with sharp architectural lines.",
    styleTags: ["minimalist", "scandi", "modern", "monochrome"],
    baseAesthetic: "Minimalism"
  },
  {
    name: "Cyber-Tech Windbreaker",
    description: "Water-resistant neon-accented jacket with modular pockets.",
    styleTags: ["cyberpunk", "techwear", "streetwear", "futuristic"],
    baseAesthetic: "Cyberpunk"
  },
  {
    name: "Silk Sun-Dress",
    description: "Flowing floral silk dress with ruffled edges and warm tones.",
    styleTags: ["bohemian", "vintage", "summer", "soft"],
    baseAesthetic: "Boho Chic"
  }
];

async function seed() {
  console.log("🚀 Starting Seeding...");
  
  for (const product of products) {
    await client.data
      .creator()
      .withClassName('ProductStyle')
      .withProperties({
        name: product.name,
        description: product.description,
        styleTags: product.styleTags,
        aesthetic: product.baseAesthetic,
      })
      .do();
    console.log(`✅ Indexed: ${product.name}`);
  }
  
  console.log("✨ Seeding Complete!");
}

seed().catch(console.error);