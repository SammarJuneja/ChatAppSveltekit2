import { json } from "@sveltejs/kit";
import mongoose from "mongoose";
import User from "../../../../../lib/modals/user.js";

export async function GET({ params, locals }) {
    try {
        if (!locals.userId) {
            return json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const { userId } = params;
        console.log(userId)
        const userGet = await User.findOne({
            _id: userId
        });

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return json({ error: "Invalid user ID" }, { status: 400 });
        }

        if (!userGet) {
            return json({ "error": "User has no chats" }, { status: 404 });
        } else {
            return json({ chat: userGet.chats }, { status: 200 });
        }
    } catch (error) {
        console.log(error)
        return json({ "error": "Internal server error" }, { status: 500 });
    }
}