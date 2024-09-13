import { json } from '@sveltejs/kit';
import Message from '../../../../../lib/modals/message.js';

export async function POST({ request, locals }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const { messageId, reaction } = request.body;
      const messageGet = await Message.findOne({
        _id: messageId
      });
      if (!messageGet) {
        return json({ "error": "Message was not found" }, { status: 404 });
      } else {
        await Message.updateOne({
          _id: messageId
        }, {
          $push: {
            reaction: reaction
          }
        });
        return json({ "message": "Reaction was added successfully" }, { status: 200 });
      }
    } catch (error) {
      console.log(error)
      return json({ "error": "Internal server error" }, { status: 500 })
    }
}
  