import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();


//adding socket server on top of express server 
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET , POST"],
  }
});

const userSocketMap = {}; //{userId:socket.id}




//listening for connections 
io.on('connection', (socket) => {
  console.log("user connected:" + socket.id);


  const userId = socket.handshake.query.userId;

  if (userId != 'undefined') {
    userSocketMap[userId] = socket.id;


    //io.emit is used to send events to all the connected  clients 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  //cheking for disconnections

  socket.on('disconnect', () => {
    console.log("user disconnected:" + socket.id);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

  })
});

export { app, io, server }; 