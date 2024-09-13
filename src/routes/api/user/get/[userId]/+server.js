import { json } from "@sveltejs/kit";
import User from "../../../../../lib/modals/user.js";

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
      } else {
        return json({ userGet }, { status: 200 });
      }
    } catch (err) {
      console.log(err)
      return json({ message: "Internal Server Error" }, { status: 500 });
    }
}
