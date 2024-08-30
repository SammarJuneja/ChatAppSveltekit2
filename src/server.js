import socketConnection from "./lib/sockets/socket.js";
import { createServer } from "http";
import express, { json } from "express";
import {router as auth} from "./api/chat/index.js";
import {router as chat} from "./api/chat/index.js";
import {handler} from "../build/handler.js";
import { connectDB } from "./stores/store.js";

const app = express();

app.use(json());
app.use(handler);
app.use("/api/v1/auth", auth);
app.use("/api/v1/chat", chat);

app.get("/test", async (req, res) => {
    res.send("he");
});

const server = createServer(app);

socketConnection(server);

server.listen(4000, () => {
    console.log("Server running on port 4000");
    connectDB();
});