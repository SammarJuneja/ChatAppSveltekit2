import { json } from '@sveltejs/kit';
import { connectDB, signAccessToken, signRefreshToken } from "../../../../stores/store.js";
import User from "../../../../lib/modals/user.js";
import { hashSync } from "bcrypt";

export async function POST({ request }) {
    connectDB();
    const { username, email, password } = await  request.json();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
    console.log(email, username, password)
  
    if (!username || !email || !password) {
        return json({
            "error": "Please fill all the details"
        }, { "status": 400 });
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
  
    const accessToken = signAccessToken({ "userId": user._id });
    const refreshToken = signRefreshToken({ "userId": user._id  });
  
    return json({
        "status": 200,
        "message": `Your account is successfully created by username ${username}`,
        "accessToken": accessToken,
        "refreshToken": refreshToken
    });
}