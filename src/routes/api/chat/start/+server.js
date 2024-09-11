import { json } from '@sveltejs/kit';
import User from "../../../../lib/modals/user.js";
import Chat from "../../../../lib/modals/chat.js";

export async function POST({ request }) {
    try {
      const { userid, loggedUser } = request.body;
      const users = [loggedUser, userid]
      const chatGet = await Chat.find({
        _id: {
          $in: users
        }
      });
  
      if (chatGet.length === 2) {
        return json({ chatGet });
      } else {
        const newChat = new Chat({
          participants: users
        });
        await newChat.save()
        await User.updateOne({
          _id: loggedUser
        }, {
          $push: {
            chats: userid
          }
        });
        await User.updateOne({
          _id: userid
        }, {
          $push: {
            chats: loggedUser
          }
        });
        return json({ newChat });
      }
    } catch (error) {
      console.log(error)
      return json({ "error": "Internal server error" });
    }
}