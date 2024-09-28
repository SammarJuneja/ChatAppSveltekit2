import { jwtDecode } from 'jwt-decode';
import { getChat, getChatMessage, getUser } from '../../../lib/functions.js';

export async function load({ params }) {
    const { userid } = params;
    const token = localStorage.getItem("token");
    
    try {
        const decodedToken = jwtDecode(token);
        const user = await getUser(userid, token);
        const author = await getUser(decodedToken.userId, token)
        const chatId = await getChat(userid, token);
        console.log(chatId, user, author)
        const messages = await getChatMessage(chatId.chat[0]._id, token);
         
        const data = {
            user: user,
            author: author,
            token: token,
            chatId: chatId,
            messages: messages
        };

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const ssr = false;
