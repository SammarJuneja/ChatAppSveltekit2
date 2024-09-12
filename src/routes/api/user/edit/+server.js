import { json } from "@sveltejs/kit";
import User from "../../../../lib/modals/user";

export async function POST({ request }) { 
  try {
    const { newUsername, newEmail } = request;
  
    const userId = req.userId;
    const dbUser = await User.findOne({ _id: userId });

    if (!dbUser) {
      return json({ status: 404,  message: "An unexpected error has occured" });
    }
    
    if (newUsername && dbUser.username !== newUsername) {
      dbUser.username = newUsername;
      await dbUser.save();
      return json({ status: 200, message: `Username changed to ${newUsername} successfully` });
    } else if (newUsername) {
      return res.status(400).json({ error: "Your new username must be different from old username"});
    }
        
    if (newEmail && dbUser.email !== newEmail) {
      dbUser.email = newEmail;
      await dbUser.save();
      return json({ status: 200, message: `Email changed to ${newEmail} successfully` });
    } else if (newEmail) {
      return json({ status: 400, error: "Your new email must be different from old email"});
    }
  } catch (error) {
    console.log(error);
    return json({ status: 500, error: "Internal server error"});
  }
}
