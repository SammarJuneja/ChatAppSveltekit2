import ioClient from "socket.io-client";

const socket = ioClient("http://localhost:4000", {
    transports: ['websocket'],
    // reconnectionAttempts: 5, // Retry connection attempts
    // timeout: 10000
});

export const io = socket;