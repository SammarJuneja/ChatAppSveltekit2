import { json } from "@sveltejs/kit";
import User from "../../../../../lib/modals/user";

export async function GET({ params, locals }) {
    try {
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const { userId } = params;
      
      const userGet = await User.findOne({
        _id: userId
      });
  
      if (!userGet) {
        return json({ error: "User not found" }, { status: 404 });
      } else if (!userGet.friends) {
        return json({ error: "User has no friends" }, { status: 404 });
      } else {
        return json({ friends: userGet.friends }, { status: 200 });
      }
    } catch (err) {
      return json({ message: "Internal Server Error" }, { status: 500 });
    }
}
