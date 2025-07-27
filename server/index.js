
const express = require('express');
const http = require('http');
const { Server } = require('ws');

const { connectRedisClients } = require('./lib/redis-client');
const registerWebSocket = require('./sockets/websocket');

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

app.get('/', (req, res) => res.send('🚀 Chat server is running'));

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectRedisClients();
  console.log('✅ Redis connected');

  registerWebSocket(wss);

  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

start();
