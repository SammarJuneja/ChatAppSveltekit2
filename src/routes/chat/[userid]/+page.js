import { getChat, getChatMessage, getUser } from '../../../lib/functions.js';

export async function load({ params }) {
    const { userid } = params;
    const token = localStorage.getItem("token");
    console.log(token);

    try {
        const user = await getUser(userid, token);
        const chatId = await getChat(userid, token);
        const messages = await getChatMessage(chatId.chat[1]._id, token);
        console.log(chatId.chat[1]._id, messages.messages);
         
        const data = {
            user: user,
            token: token,
            chatId: chatId,
            messages: messages
        };

        console.log(data, token, chatId);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const ssr = false;
