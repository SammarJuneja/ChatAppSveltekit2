import socketConnection from "./src/lib/sockets/socket.js";
import { createServer } from "http";
import express from "express";
import { handler } from "./build/handler.js";

const app = express();

const server = createServer(app);

socketConnection(server);

app.use(handler);

server.listen(4000, () => {
    console.log("Server running on port 4000");
});