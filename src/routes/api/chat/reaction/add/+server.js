import { json } from '@sveltejs/kit';
import Message from '../../../../../lib/modals/message.js';

export async function POST({ request}) {
    try {
      const { messageId, reaction } = request.body;
      const messageGet = await Message.findOne({
        _id: messageId
      });
      if (!messageGet) {
        return json({ "status": 404, "error": "Message was not found"});
      } else {
        await Message.updateOne({
          _id: messageId
        }, {
          $push: {
            reaction: reaction
          }
        });
        return json({ "message": "Reaction was added successfully" });
      }
    } catch (error) {
      console.log(error)
      return json({ "error": "Internal server error" })
    }
}
  