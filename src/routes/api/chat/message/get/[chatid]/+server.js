import Chat from "../../../../../../lib/modals/chat.js";

export async function GET({ params, locals }) {
    try {
        if (!locals.userId) {
            return json({ error: "Unauthorized" }, { status: 401 });
        }

        const { chatid } = params;

        const chat = await Chat.findOne({
            _id: chatid
        });

        if (!chat) {
            return json({ error: "Chat not found" }, { status: 404 });
        } else {
            return json({ chat: chat }, { status: 200 });
        }
    } catch (error) {

    }
}