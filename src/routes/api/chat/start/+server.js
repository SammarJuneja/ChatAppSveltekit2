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
      const users = [user, locals.userId]
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
        console.log(locals.userId.trim(),"h")
        const updatef = await User.updateOne({
          _id: locals.userid
        }, {
          $push: {
            chats: user
          }
        });
        
        const up9 = await User.updateOne({
          _id: user
        }, {
          $push: {
            chats: locals.userId
          }
        });
        console.log(updatef, up9)
        return json({ newChat }, { status: 200 });
      }
    } catch (error) {
      console.log(error)
      return json({ "error": "Internal server error" }, { status: 500 });
    }
}