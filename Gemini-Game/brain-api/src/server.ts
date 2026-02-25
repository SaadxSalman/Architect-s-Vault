import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Decision from './models/Session';

const app = express();
app.use(express.json()); // Essential for receiving Rust telemetry
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Endpoint for Rust to post live telemetry
app.post('/api/telemetry', async (req, res) => {
  const telemetryData = req.body;

  // 1. Save to MongoDB
  const decision = new Decision(telemetryData);
  await decision.save();

  // 2. Push to Dashboard in real-time
  io.emit('agent-thought', telemetryData);
  
  res.status(200).send('Telemetry Received');
});

io.on('connection', (socket) => {
  console.log('Dashboard Client Connected: ', socket.id);
});

httpServer.listen(5000, () => console.log('🧠 Brain-API active on port 5000'));