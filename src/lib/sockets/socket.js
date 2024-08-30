import { Server } from "socket.io";

function socketConnection(server) {
    const io = new Server(server);

    io.on("connection", (socket) => {
        let username = "test";
        socket.emit("join", username);

        socket.on("message", (message) => {
            io.emit("message", {
                from: username,
                message: message,
                time: new Date().toLocaleString()
            });
        });

        socket.on("chat", (chat) => {
            io.emit("chat", {
                
            });
        });
    });
}

export default socketConnection;