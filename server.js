const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);

  const rooms = {};

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ roomId, user }) => {
      console.log(`${roomId} is the room ID and user: ${user} `);
      socket.join(roomId);
      if (!rooms[roomId]) {
        rooms[roomId] = { count: 0, users: [] };
      }
      if (user && !rooms[roomId].users.includes(user)) {
        rooms[roomId].users.push(user);
      }

      io.to(roomId).emit('updateRoom', rooms[roomId]);
    });

    socket.on('increment', ({ roomId, user }) => {
      if (rooms[roomId]) {
        rooms[roomId].count += 1;
        if (user && !rooms[roomId].users.includes(user)) {
          rooms[roomId].users.push(user);
        }
        io.to(roomId).emit('updateRoom', rooms[roomId]);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
