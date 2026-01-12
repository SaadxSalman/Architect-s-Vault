import 'dotenv/config';
import { createClient } from 'redis';
import os from 'os';
import osUtils from 'os-utils';

const redisClient = createClient({ url: process.env.REDIS_URL });
const agentName = process.env.AGENT_NAME || 'Unknown-Server';

// Helper to get RAM usage percentage
const getRamUsage = () => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  return ((usedMemory / totalMemory) * 100).toFixed(2);
};

async function startAgent() {
  await redisClient.connect();
  console.log(`Agent [${agentName}] connected to Redis.`);

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log(`Agent [${agentName}] disconnecting from Redis.`);
    await redisClient.quit();
    process.exit(0);
  });

  setInterval(() => {
    osUtils.cpuUsage((cpuPercent) => {
      const stats = {
        id: agentName,
        cpu: (cpuPercent * 100).toFixed(2),
        ram: getRamUsage(),
        timestamp: new Date().toLocaleTimeString()
      };

      // Publish to Redis Pub/Sub
      redisClient.publish('server_stats', JSON.stringify(stats));
    });
  }, 2000); // Send every 2 seconds
}

startAgent().catch(console.error);