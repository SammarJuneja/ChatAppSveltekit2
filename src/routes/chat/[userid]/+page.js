import { getChatMessage, getUser } from '../../../lib/functions.js';
import { verifyRefreshToken } from '../../../stores/store.js';

export async function load({ params }) {
    const { userid } = params;
    let token = localStorage.getItem("token");

    const data = await getUser(userid, token);
    // // const decodedToken = verifyRefreshToken(token);
    // const lastMessage = await getChatMessage(chatid, token);
    return data;
}

export const ssr = false;