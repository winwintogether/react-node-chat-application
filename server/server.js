import express from "express";

import cors from "cors";

import http from "http";

import { Server } from "socket.io";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected", socket);
  socket.on("disconnect", () => console.log("user disconnected", socket.id));
});

server.listen(5000, () => console.log("listening on 5000"));
