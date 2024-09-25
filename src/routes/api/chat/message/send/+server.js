import { json } from "@sveltejs/kit";
import Message from "../../../../../lib/modals/message.js";
import Chat from "../../../../../lib/modals/chat.js";

export async function POST({ request, locals }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const { chatId, message } = await request.json();
      const chatGet = await Chat.findOne({
        _id: chatId
      });
  
      if (!chatGet) {
        return json({ message: "Chat with provided id was not found" })
      } else {
        const newMessage = new Message({
          chatId,
          message,
          sender: locals.userId
        });
        await newMessage.save();
        await Chat.updateOne({
          _id: chatId
        }, {
          $set: {
            lastMessage: newMessage._id,
            lastMessageDate: new Date()
          }
        });
        return json({ "message": newMessage })
      }
    } catch (error) {
      console.log(error)
      return json({ error: "Internal server error" }, { status: 500 })
    }
}
