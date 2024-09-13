import { json } from '@sveltejs/kit';
import User from "../../../../lib/modals/user.js";
import Chat from "../../../../lib/modals/chat.js";

export async function POST({ request, locals }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const { loggedUser } = request.json();
      const users = [loggedUser, locals.userId]
      const chatGet = await Chat.find({
        _id: {
          $in: users
        }
      });

      if (chatGet.length === 2) {
        return json({ chatGet }, { status: 200 });
      } else {
        const newChat = new Chat({
          participants: users
        });
        await newChat.save()
        await User.updateOne({
          _id: loggedUser
        }, {
          $push: {
            chats: locals.userId
          }
        });
        await User.updateOne({
          _id: locals.userId
        }, {
          $push: {
            chats: loggedUser
          }
        });
        return json({ newChat }, { status: 200 });
      }
    } catch (error) {
      console.log(error)
      return json({ "error": "Internal server error" }, { status: 500 });
    }
}