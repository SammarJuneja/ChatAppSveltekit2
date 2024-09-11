import { json } from "@sveltejs/kit";
import User from "../../../../lib/modals/user";


export async function GET() {
    try {
      const users = await User.find();
      return json({ status: 200, users: users });
    } catch (err) {
      return json({ status: 500, message: "Internal Server Error" });
    }
}
