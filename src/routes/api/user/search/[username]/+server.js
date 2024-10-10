import { json } from '@sveltejs/kit';
import User from '../../../../../lib/modals/user.js';

export async function GET({ locals, params }) {
    try {
        if (!locals.userId) {
          return json({ error: "Unauthorized" }, { status: 401 });
        }

        const { username } = params;

        if (!username) {
            return json({ "message": "Username was not provided" }, { status: 400 });
        }

        const user = await User.find({
            $or: [{
                username: { $regex: username, $options: "i" }
            }]
        });

        if (!user) {
            return json({ "message": "User was not found" }, { status: 404 });
        }

        return json({ "message": user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return json({ "message": "Internal server error" }, { status: 500 });
    }
}