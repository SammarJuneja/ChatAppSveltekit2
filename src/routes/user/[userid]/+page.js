import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../../lib/functions.js';

export async function load({ params }) {
    const { userid } = params;
    const token = localStorage.getItem("token");
    
    try {
        const decodedToken = jwtDecode(token);
        const user = await getUser(userid, token);

        let author = decodedToken.userId === userid;
            
        const data = {
            author: author ? true : false,
            user: user
        };
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const ssr = false;