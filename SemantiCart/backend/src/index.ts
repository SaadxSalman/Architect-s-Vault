import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router.js';
import { initProductCollection } from './lib/weaviate.js';
import { syncSupabaseToWeaviate } from './lib/sync.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({
      user: { id: 'test-user-uuid' } 
    }), 
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  
  try {
    // Ensure Weaviate collection is ready
    await initProductCollection();
    // Start real-time sync and run one-time migration
    await syncSupabaseToWeaviate();
    console.log('✅ Weaviate Sync and Realtime Listener Active');
  } catch (error) {
    console.error('❌ Failed to initialize search engine:', error);
  }
});