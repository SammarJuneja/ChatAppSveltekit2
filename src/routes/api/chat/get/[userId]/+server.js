import { json } from "@sveltejs/kit";
import mongoose from "mongoose";
import Chat from "../../../../../lib/modals/chat.js"

export async function GET({ params, locals }) {
    try {
        if (!locals.userId) {
            return json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const { userid } = params;
        const chats = await Chat.find({
            participants: { $all: [userid, locals.userId] }
        });

        if (chats.length === 0) {
            return json({ "chat": "This chat does not exist" }, { status: 404 });
        } else {
            return json({ chat: chats }, { status: 200 });
        }
    } catch (error) {
        console.log(error)
        return json({ "error": "Internal server error" }, { status: 500 });
    }
}