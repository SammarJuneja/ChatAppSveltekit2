import { Server } from "socket.io";
import Message from "../modals/message.js";

function socketConnection(server) {
    const io = new Server(server);

    io.on("connection", (socket) => {
        let username = `User ${Math.floor(Math.random() * 100)}`;
        socket.emit("join", username);

        socket.on("joinChat", async (roomId) => {
            socket.join(roomId);
            const messages = await Message.find({ chatId: roomId }).sort({ timestamp: 1 }).limit(50);
            socket.emit("fetchMessage", messages);
            console.log(`${user} joined room: ${roomId}`);
        });

        socket.on("message", async ({ message, roomId }) => {
            try {
                const newMesssage = new Message({
                    sender: message.sender,
                    content: message.content
                });
                await newMesssage.save();

                io.to(roomId).emit("message", {
                    sender: message.sender,
                    content: message.content
                });
            } catch (error) {
                console.log(error);
            }
        });

        // socket.on("fetchmessage", async () => {
        //     try {
               
        //     } catch (error) {

        //     }
        // });

        // socket.on("message", (message) => {
        //     io.emit("message", {
        //         from: id,
        //         message: message,
        //     });
        // });

        // socket.on("chat", (chat) => {
        //     io.emit("chat", {
                
        //     });
        // });
    });
}

export default socketConnection;