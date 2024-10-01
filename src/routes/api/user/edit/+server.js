import { json } from "@sveltejs/kit";
import User from "../../../../lib/modals/user";

export async function POST({ request, locals }) { 
  try {
    if (!locals.userId) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newUsername, newEmail } = await request.json();

    const dbUser = await User.findOne({ _id: locals.userId });

    if (!dbUser) {
      return json({ message: "An unexpected error has occured" }, { status: 404 });
    }
    
    if (newUsername && dbUser.username !== newUsername) {
      dbUser.username = newUsername;
      await dbUser.save();
      return json({ message: `Username changed to ${newUsername} successfully` }, { status: 200 });
    } else if (newUsername) {
      return res.status(400).json({ error: "Your new username must be different from old username"}, { status: 400 });
    }
        
    if (newEmail && dbUser.email !== newEmail) {
      dbUser.email = newEmail;
      await dbUser.save();
      return json({ message: `Email changed to ${newEmail} successfully` }, { status: 200 });
    } else if (newEmail) {
      return json({ error: "Your new email must be different from old email"}, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return json({ error: "Internal server error"}, { status: 500 });
  }
}
