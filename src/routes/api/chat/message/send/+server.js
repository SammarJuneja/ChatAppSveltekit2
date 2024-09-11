import { json } from "@sveltejs/kit";
import Message from "../../../../../lib/modals/message.js";

export async function POST({ request }) {
    try {
      const { chatId, message, userId } = request.body;
      const chatGet = await Chat.findOne({
        _id: chatId
      });
  
      if (!chatGet) {
        return json({ "message": "Chat with provided id was not found" })
      } else {
        const newMessage = new Message({
          chatId,
          message,
          sender: request.userId
        });
        await newMessage.save();
        return json({ "message": newMessage })
      }
    } catch (error) {
      return json({
        "status": 500,
        "error": "Internal server error"
    })
    }
}
