import { json } from "@sveltejs/kit";
import User from "../../../../../lib/modals/user";

export async function POST({ request, locals }) { 
  try {
    if (!locals.userId) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bio } = await request.json();

    const user = await User.findOne({ _id: locals.userId });

    if (!user) {
        return json({ message: "An unexpected error occured" }, { status: 404 });
    }

    await User.updateOne({
        _id: locals.userId
    }, {
        $set: {
            bio: bio || ""
        },
    });

    return json({ message: "User bio was changed successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return json({ message: "Internal server error"}, { status: 500 });
  }
}
