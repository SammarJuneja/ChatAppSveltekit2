import { json } from '@sveltejs/kit';
import Message from '../../../../../../lib/modals/message.js';

export async function DELETE({ params, locals }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const { messageId } = params;
      const messageGet = await Message.deleteOne({ _id: messageId });
      if (messageGet) {
        return json({ message: "Message was deleted successfully" }, { status: 200 });
      } else {
        return json({ error: "Message was not found" }, { status: 404 });
      }
    } catch (error) {
      console.log(error)
      return json({ error: "Internal server error" }, { status: 500 });
    }
}
