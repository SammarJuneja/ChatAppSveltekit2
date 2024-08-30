import socketConnection from "./socket.js";

const websocket = {
    name: "webSocket",
    configureServer(server) {
        socketConnection(server.httpServer);
    }
}

export default websocket;