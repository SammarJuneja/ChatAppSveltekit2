import { json } from '@sveltejs/kit';
import User from "../../../../lib/modals/user.js";
import Chat from "../../../../lib/modals/chat.js";
import mongoose from "mongoose";

export async function POST({ request, locals }) {
    try {
        if (!locals.userId) {
            return json({ error: "Unauthorized" }, { status: 401 });
        }

        const { user } = await request.json();

        const participants = [new mongoose.Types.ObjectId(user), new mongoose.Types.ObjectId(locals.userId)];
        console.log(participants)

        if (user === locals.userId) {
            return json({ error: "You can't start a chat with yourself" }, { status: 400 });
        }

        const chatGet = await Chat.find({
            participants: {
                $all: participants
            }
        });

        if (chatGet.length > 0) {
            return json({ message: "Chat already exists" }, { status: 400 });
        } else {
            const newChat = new Chat({
                participants: participants
            });
            await newChat.save();

            await User.updateOne(
                { _id: user },
                { $addToSet: { chats: locals.userId } }
            );

            await User.updateOne(
                { _id: locals.userId },
                { $addToSet: { chats: user } }
            );

            return json({ newChat }, { status: 200 });
        }
    } catch (error) {
        console.error("Error creating chat:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
