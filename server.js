import socketConnection from "./src/lib/sockets/socket.js";
import { createServer } from "http";
import express, { json } from "express";
import { router as auth } from "./src/api/auth/index.js";
import { router as chat } from "./src/api/chat/index.js";
import { handler } from "./build/handler.js";
import { connectDB } from "./src/stores/store.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(json());
app.use("/api/v1/auth", auth);
app.use("/api/v1/chat", chat);

app.get("/test", async (req, res) => {
    res.send("he");
});

const server = createServer(app);

socketConnection(server);

app.use(handler);

server.listen(3000, () => {
    console.log("Server running on port 4000");
    connectDB();
});