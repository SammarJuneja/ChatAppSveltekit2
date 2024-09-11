import { json } from '@sveltejs/kit';
import { signAccessToken, signRefreshToken } from "../../../../stores/store.js";
import User from "../../../../lib/modals/user.js";
import { compare } from "bcrypt";

export async function POST({ request }) {
    const { email, password } = request.body;

    if (!email && !password) {
        return json({
            "status": 401,
            "error": "You didn\'t fill email and password"
        });
    }

    const user = await User.findOne({
        "email": email
    });

    if (!user) {
        return json({
            "status": 404,
            "error": "Username with that email was not found"
        });
    }

    const decodedPass = await compare(password, user.password);

    if (!decodedPass) {
        return json({
            "status": 401,
            "error": "You entered wrong password"
        });
    }

    const accessToken = signAccessToken({ "username": user.username });
    const refreshToken = signRefreshToken({ "username": user.username });
    
    return json({
        "status": 200,
        "message": "You are logged in successfully",
        "accessToken": accessToken,
        "refreshToken": refreshToken
    });
}
