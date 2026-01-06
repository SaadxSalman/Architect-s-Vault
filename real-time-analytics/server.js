require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Redis Client Setup
const client = redis.createClient({ url: process.env.REDIS_URL });
client.on('error', (err) => console.log('Redis Error', err));
client.connect();

app.use(express.static('public'));

// Real-time Logic
io.on('connection', async (socket) => {
    // 1. Increment Live Users
    await client.incr('live_users');
    // 2. Increment Total Views
    await client.incr('total_views');

    // Broadcast updates to all clients
    const updateStats = async () => {
        const liveUsers = await client.get('live_users');
        const totalViews = await client.get('total_views');
        io.emit('statsUpdate', { 
            liveUsers: parseInt(liveUsers), 
            totalViews: parseInt(totalViews),
            timestamp: new Date().toLocaleTimeString()
        });
    };

    updateStats();

    socket.on('disconnect', async () => {
        await client.decr('live_users');
        updateStats();
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Analytics Server running on http://localhost:${PORT}`);
});