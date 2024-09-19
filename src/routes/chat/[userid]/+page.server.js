import { getUser, getToken } from '../../../lib/functions.js';

export async function load({ params }) {
    const { userid } = params;
    const user = await getToken(userid);
    console.log(user)
    let token = user.token;

    const data = await getUser(userid, token);
    console.log(data)
    return data;
}

export const ssr = false;