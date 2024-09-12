import { json } from "@sveltejs/kit";
import User from "../../../../../lib/modals/user.js";

export async function GET({ params, locals }) {
    try {
      console.log(locals.userId, locals)
      if (!locals.userId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      console.log(1)
      const { userId } = params;
      const userGet = await User.findOne({
        _id: userId
      });

      console.log(userGet)
  
      if (!userGet) {
        return json({ status: 404, error: "User not found" });
      } else {
        return json({ userGet });
      }
    } catch (err) {
      console.log(err)
  return json({ message: "Internal Server Error" }, { status: 500 });
    }
}
