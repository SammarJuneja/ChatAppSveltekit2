import { json } from "@sveltejs/kit";
import Message from "../../../../../../lib/modals/message.js";

export async function GET({ params, locals }) {
    try {
        if (!locals.userId) {
            return json({ error: "Unauthorized" }, { status: 401 });
        }

        const { chatid } = params;

        const chatMessages = await Message.find({ chatId: chatid }).populate("sender", "username");

        if (!chatMessages) {
            return json({ error: "Chat not found" }, { status: 404 });
        } else {
            return json({ messages: chatMessages }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return json({ error: error }, { status: 500 });
    }
}
