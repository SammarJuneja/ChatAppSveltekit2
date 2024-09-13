import { json } from "@sveltejs/kit";
import Message from "../../../../../lib/modals/message";

export async function PUT({ request, locals }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }
      
      const { messageId, message } = request.json();
      const messageGet = await Message.findOne({
        _id: messageId
      });
      if (!messageGet) {
        return json({ status: 404, error: "Message was not found"});
      } else {
        await Message.updateOne({
          _id: messageId
        }, {
          $set: {
            message
          }
        });
        return json({ status: 200, message: "Message was edited successfully" });
      }
    } catch (error) {
      console.log(error)
      return json({ status: 500, error: "Internal server error" });
    }
}
  