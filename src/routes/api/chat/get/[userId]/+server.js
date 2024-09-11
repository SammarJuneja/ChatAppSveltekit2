import { json } from "@sveltejs/kit";
import mongoose from "mongoose";
import User from "../../../../../lib/modals/user.js";
import { connectDB } from "../../../../../stores/store.js";
connectDB();

export async function GET({ params }) {
    try {
        const { userId } = params;
        console.log(userId)
        const userGet = await User.findOne({
            _id: userId
        });

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return json({
                error: "Invalid user ID"
            }, { status: 400 });
        }

        if (!userGet) {
            return json({
                "status": 404,
                "error": "User has no chats"});
        } else {
            return json({ chat: userGet.chats });
        }
    } catch (error) {
        console.log(error)
        return json({
            "status": 500,
            "error": "Internal server error"
        });
    }
}