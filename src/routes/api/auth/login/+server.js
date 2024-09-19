import { json } from '@sveltejs/kit';
import { signAccessToken, signRefreshToken } from "../../../../stores/store.js";
import User from "../../../../lib/modals/user.js";
import { compare } from "bcrypt";

export async function POST({ request }) {
    const data = await request.json();

    if (!data.email && !data.password) {
        return json({ "error": "You didn\'t fill email and password" }, { "status": 400 });
    }

    const user = await User.findOne({
        "email": data.email
    });

    if (!user) {
        return json({ "error": "Username with that email was not found" }, { status: 404 });
    }

    const decodedPass = await compare(data.password, user.password);

    if (!decodedPass) {
        return json({ "error": "You entered wrong password" }, { status: 400 });
    }

    const accessToken = signAccessToken({ "userId": user._id });
    const refreshToken = signRefreshToken({ "userId": user._id });

    await User.updateOne({
        _id: user._id
    }, {
        $set: {
            verificationToken: refreshToken
        }
    });
    
    return json({
        "status": 200,
        "message": "You are logged in successfully",
        "accessToken": accessToken,
        "refreshToken": refreshToken
    });
}
