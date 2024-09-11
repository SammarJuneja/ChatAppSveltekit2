import { json } from "@sveltejs/kit";
import User from "../../../../lib/modals/user";

export async function PUT({ request }) { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });
  
    const { newUsername, newEmail } = request;
  
    const userId = req.userId;
    const dbUser = await User.findOne({ _id: userId });
    if (!dbUser)
      return res.status(500).json({ message: "An unexpected error has occured" });
    
    let result = [];
    if (newUsername && dbUser.username !== newUsername) {
      dbUser.username = newUsername;
      await dbUser.save();
      result.push({ message: `Username changed to ${newUsername} successfully` });
    } else if (newUsername) {
      return res.status(400).json({ error: "Your new username must be different from old username"});
    }
        
    if (newEmail && dbUser.email !== newEmail) {
      dbUser.email = newEmail;
      await dbUser.save();
      result.push({ message: `Email changed to ${newEmail} successfully` });
    } else if (newEmail) {
      return json({ status: 400, error: "Your new email must be different from old email"});
    }
  
    return json({ status: 200, message: 'Success', data: result });
}
