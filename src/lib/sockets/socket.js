import { Server } from "socket.io";
import Message from "../modals/message.js";

function socketConnection(server) {
    const io = new Server(server);

    io.on("connection", (socket) => {
        let username = `User ${Math.floor(Math.random() * 100)}`;
        socket.emit("join", username);

        socket.on("joinChat", async (data) => {
            const { chatId, username } = data;
            socket.join(chatId);
            const messages = await Message.find({ chatId: chatId }).sort({ timestamp: 1 }).limit(50);
            socket.emit("fetchMessage", messages);
            console.log(`${username} joined room: ${chatId}`);
        });

        socket.on("typing", (data) => {
            const { chatId, username } = data;
            const newData = {
                chatId: chatId,
                username: username
            }
            socket.to(chatId).emit("typing", newData);
        });

        socket.on("message", async (data) => {
            try {
                const { chatId, sender, message, attachment, reaction } = data;

                const newMessage = new Message({
                    chatId: chatId,
                    sender: sender,
                    message: message,
                    attachment: attachment || [],
                    reaction: reaction || [],
                });
                
                await newMessage.save();
                socket.to(chatId).emit("newMessage", newMessage);
            } catch (error) {
                console.error("Error saving message:", error);
                socket.emit("error", { message: "Could not send message." });
            }
            });
    });
}

export default socketConnection;