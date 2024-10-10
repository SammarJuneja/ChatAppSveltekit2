export async function load({ params }) {
    const { type } = params;
    
    if (type === "token") {
        const data = {
            "error": "You are not logged in" 
        }
        return data;
    } else if (type === "selfchat") {
        const data = {
            "error": "You cannot chat with yourself"
        }
        return data;
    } else if (type === "notfound") {
        const data = {
            "error": "Not found"
        }
        return data;
    } else {
        const data = {
            "error": "Not found"
        }
        return data;
    }
}