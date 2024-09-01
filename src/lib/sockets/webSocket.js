import socketConnection from "./socket.js";

const websocket = {
    name: "webSocketServer",
    configureServer(server) {
        socketConnection(server.httpServer);
    }
}

export default websocket;