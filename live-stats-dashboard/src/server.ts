import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Redis Subscription Client
const subClient = createClient({ url: process.env.REDIS_URL });

app.use(express.static(path.join(__dirname, 'public')));

async function setupServer() {
  await subClient.connect();
  console.log('Dashboard server connected to Redis.');

  // Listen for messages from ANY agent via Redis
  await subClient.subscribe('server_stats', (message) => {
    const data = JSON.parse(message);
    io.emit('stats_update', data); // Forward to all browser clients
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Dashboard running at http://localhost:${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Dashboard server disconnecting from Redis and shutting down.');
    await subClient.unsubscribe('server_stats');
    await subClient.quit();
    httpServer.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });
}

setupServer().catch(console.error);