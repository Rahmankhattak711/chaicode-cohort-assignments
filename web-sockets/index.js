import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat message", (message) => {
    io.emit("message", { id: socket.id, message });
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
