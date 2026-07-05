import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const MAX_ITEMS = 1_000_000;
const PAGE_SIZE = 100;
const checkboxState = new Map();

const getCheckboxState = (id) => checkboxState.has(id);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("load-range", ({ start = 0, end = PAGE_SIZE - 1 }) => {
    const from = Math.max(0, Math.min(start, MAX_ITEMS - 1));
    const to = Math.max(from, Math.min(end, MAX_ITEMS - 1));
    const items = [];

    for (let id = from; id <= to; id += 1) {
      items.push({ id, checked: getCheckboxState(id) });
    }

    socket.emit("range-data", {
      start: from,
      end: to,
      total: MAX_ITEMS,
      totalChecked: checkboxState.size,
      items,
    });
  });

  socket.on("toggle-checkbox", ({ id, checked }) => {
    if (typeof id !== "number" || id < 0 || id >= MAX_ITEMS) return;

    if (checked) {
      checkboxState.set(id, true);
    } else {
      checkboxState.delete(id);
    }

    io.emit("checkbox-updated", {
      id,
      checked: Boolean(checked),
      totalChecked: checkboxState.size,
    });
  });
});

app.use(express.static(path.join(__dirname)));

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
