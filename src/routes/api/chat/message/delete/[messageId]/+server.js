import { json } from '@sveltejs/kit';
import Message from '../../../../../../lib/modals/message.js';

export async function DELETE({ params }) {
    try {
      const { messageId } = params;
      const messageGet = await Message.deleteOne({ _id: messageId });
      if (messageGet) {
        return json({ status: 200, message: "Message was deleted successfully" });
      } else {
        return json({ status: 404, error: "Message was not found" });
      }
    } catch (error) {
      console.log(error)
      return json({ status: 500, error: "Internal server error" });
    }
}
