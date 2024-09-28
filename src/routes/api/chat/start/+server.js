import { json } from '@sveltejs/kit';
import User from "../../../../lib/modals/user.js";
import Chat from "../../../../lib/modals/chat.js";

export async function POST({ request, locals }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const { user } = await request.json();
      console.log(user,"h")
      const users = [user, locals.userId];
      console.log(users)

      if (user === locals.userId) {
        return json({ error: "You can't start a chat with yourself" }, { status: 400 });
      }

      const chatGet = await Chat.find({
        participants: {
          $in: users
        }
      });

      if (chatGet.length === 2) {
        return json({ chatGet }, { status: 200 });
      } else {
        const newChat = new Chat({
          participants: users
        });
        await newChat.save();

        await User.updateOne({
          _id: user
        }, {
          $push: {
            chats: locals.userId
          }
        });
        
        await User.updateOne({
          _id: locals.userId
        }, {
          $push: {
            chats: user
          }
        });
        
        console.log(locals.userId, user)
        return json({ newChat }, { status: 200 });
      }
    } catch (error) {
      console.log(error)
      return json({ "error": "Internal server error" }, { status: 500 });
    }
}