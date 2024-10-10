import { jwtDecode } from 'jwt-decode';
import { getChat, getUser } from '../../../lib/functions.js';
import { goto } from '$app/navigation';

export async function load({ params }) {
    const { userid } = params;
    const token = localStorage.getItem("token");

    if (!token) {
        goto(`/error/token`);
    }
    
    try {
        const decodedToken = jwtDecode(token);
        const user = await getUser(userid, token);
        const author = await getUser(decodedToken.userId, token)
        const chatId = await getChat(userid, token);
         
        const data = {
            user: user,
            decodedToken: decodedToken.userId,
            author: author,
            token: token,
            chatId: chatId,
        };

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const ssr = false;
