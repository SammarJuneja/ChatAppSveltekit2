import { json } from '@sveltejs/kit';
import { signAccessToken, signRefreshToken } from "../../../../stores/store.js";
import User from "../../../../lib/modals/user.js";
import { hashSync } from "bcrypt";

export async function POST({ request }) {
    try {
        const data = await request.json();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
  
        if (!data.username || !data.email || !data.password) {
            return json({ "error": "Please fill all the details" }, { "status": 400 });
        }
  
        if (!emailRegex.test(data.email) && !passRegex.test(email.password)) {
            return json({ "error": "Your email or password is invalid, your password should contain one number and one special letter" }, { status: 400 });
        }
  
        const userEmailCheck = await User.findOne({ "email": data.email });
  
        const userNameCheck = await User.findOne({ "username": data.username });
  
        if (userEmailCheck) {
            return json({ "error": "User with that email already exists" }, { status: 500 });
        }
  
        if (userNameCheck) {
            return json({ "error": "Account with that username already exists" }, { status: 400 });
        }
    
        const hashedPassword = hashSync(data.password, 10);
  
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
        });
        user.save();
  
        const accessToken = signAccessToken({ "userId": user._id });
        const refreshToken = signRefreshToken({ "userId": user._id  });

        await User.updateOne({
            _id: user._id
        }, {
            $set: {
                verificationToken: refreshToken
            }
        });
  
        return json({
            "message": `Your account is successfully created by username ${data.username}`,
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return json({ error: "Internal server error" }, { status: 500});
    }
}