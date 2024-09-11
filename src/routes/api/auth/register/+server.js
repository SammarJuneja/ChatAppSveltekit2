import { json } from '@sveltejs/kit';
import { signAccessToken, signRefreshToken } from "../../../../stores/store.js";
import User from "../../../../lib/modals/user.js";
import { hashSync } from "bcrypt";

export async function POST({ request }) {
    const { username, email, password } = request.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
  
    if (!username || !email || !password) {
        return json({
            "status": 401,
            "error": "Please fill all the details"
        });
    }
  
    if (!emailRegex.test(email) || !passRegex.test(password)) {
        return json({
            "status": 401,
            "error": "Your email or password is wrong, your password should contain one number and one special letter"
        });
    }
  
    const userEmailCheck = await User.findOne({
        email,
    });
  
    const userNameCheck = await User.findOne({
        username,
    });
  
    if (userEmailCheck) {
        return json({
            "status": 500,
            "error": "User with that email already exists"
        });
    }
  
    if (userNameCheck) {
        return json({
            "status": 500,
            "error": "Account with that username already exists"
        });
    }
    
    const hashedPassword = hashSync(password, 10);
  
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    user.save();
  
    const accessToken = signAccessToken({ "username": user.username });
    const refreshToken = signRefreshToken({ "username": user.username });
  
    return json({
        "status": 200,
        "message": `Your account is successfully created by username ${username}`,
        "accessToken": accessToken,
        "refreshToken": refreshToken
    });
}