import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { createContext } from './context';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 1. Setup for ES Modules (Fix for __dirname if using ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Load Environment Variables from the root directory
dotenv.config({ path: path.join(__dirname, '../../../.env') });

// Critical Validation: Stop server if Supabase keys are missing
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ ERROR: Supabase credentials not found in .env file.");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 4000;

// 3. Middleware
// CORS allows your Frontend (3000) to communicate with your Backend (4000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// 4. PDF Storage & Static Serving
// This allows the frontend to access labels via http://localhost:4000/labels/filename.pdf
const exportDir = path.join(process.cwd(), 'exports', 'labels');

if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
  console.log('📁 Created PDF Export directory at:', exportDir);
}

// Map the /labels URL path to the physical folder
app.use('/labels', express.static(exportDir));

// 5. tRPC Adapter
// Connects the appRouter to the Express pipeline
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// 6. Enhanced Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OMS Backend Active', 
    storage: 'Local FS',
    timestamp: new Date().toISOString() 
  });
});

// 7. Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('🔥 Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 8. Start Server
app.listen(PORT, () => {
  console.log(`
🚀 ============================================
   ENTERPRISE OMS BACKEND RUNNING
   URL: http://localhost:${PORT}/trpc
   PDF ACCESS: http://localhost:${PORT}/labels
   ============================================
  `);
});