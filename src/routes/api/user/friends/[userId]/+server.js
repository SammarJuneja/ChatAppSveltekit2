import { json } from "@sveltejs/kit";
import User from "../../../../../lib/modals/user";

export async function GET({ params }) {
    try {
      const { userId } = params;
      const userGet = await User.findOne({
        _id: userId
      });
  
      if (!userGet) {
        return json({ status: 404, error: "User not found" });
      } else if (!userGet.friends) {
        return json({ status: 404, error: "User has no friends" });
      } else {
        return json({ status: 200, friends: userGet.friends });
      }
    } catch (err) {
      return json({ status: 500, message: "Internal Server Error" });
    }
}
