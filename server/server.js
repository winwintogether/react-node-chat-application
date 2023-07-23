import express from "express";

import cors from "cors";

import http from "http";

import { Server } from "socket.io";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`user with ID ${socket.id} join the room ${data.room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });



  socket.on("disconnect", () => console.log("user disconnected", socket.id));
});

server.listen(5000, () => console.log("listening on 5000"));
