import { getUser } from '../../../lib/functions.js';

export async function load({ params }) {
    const { userid } = params;
    let token = localStorage.getItem("token");

    const data = await getUser(userid, token);
    return data;
}

export const ssr = false;