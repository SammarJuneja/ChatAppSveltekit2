import { json } from "@sveltejs/kit";
import User from "../../../../../lib/modals/user.js";

export async function GET({ params }) {
    try {
      const { userId } = params;
      const userGet = await User.findOne({
        username: userId
      });
  
      if (!userGet) {
        return json({ status: 404, error: "User not found" });
      } else {
        return json({ userGet });
      }
    } catch (err) {
      return json({ status: 500, message: "Internal Server Error" });
    }
}
