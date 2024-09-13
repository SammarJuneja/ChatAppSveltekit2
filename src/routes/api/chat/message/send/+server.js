import { json } from "@sveltejs/kit";
import Message from "../../../../../lib/modals/message.js";

export async function POST({ request }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const { chatId, message } = request.json();
      const chatGet = await Chat.findOne({
        _id: chatId
      });
  
      if (!chatGet) {
        return json({ "message": "Chat with provided id was not found" })
      } else {
        const newMessage = new Message({
          chatId,
          message,
          sender: locals.userId
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
