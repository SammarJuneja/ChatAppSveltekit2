import mongoose from"mongoose";
import jwt from"jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
dotenvConfig()
  
export const important = {
    mongo_uri: process.env.MONGO_URI,
    jwtAccess: {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: "15m",
    },
    jwtRefresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: "7d",
    },
    hashing: {
        saltRounds: 10,
    },
};

export const logo = "https://media.discordapp.net/attachments/916361716965707836/1277165337825251338/OpenChat.png?ex=66cc2c69&is=66cadae9&hm=7e62f9d41dbfb54c7857ee8826c900759630569fb5953adca4762a9480b90712&";

export const apiUrl = "http://localhost:4000";

export const JWT_ACCESS_TOKEN = important.jwtAccess.secret;
export const JWT_REFRESH_TOKEN = important.jwtRefresh.secret;

export const signAccessToken = (payload, expiresIn = "15m") => {
    return jwt.sign(payload, JWT_ACCESS_TOKEN, { expiresIn });
}

export const signRefreshToken = (payload, expiresIn = "7d") => {
    return jwt.sign(payload, JWT_REFRESH_TOKEN, { expiresIn });
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_ACCESS_TOKEN);
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_TOKEN);
}

export const connectDB = async () => {
    try {
        await mongoose.connect(important.mongo_uri);
        console.log("MongoDb is connected");
    } catch (error) {
        console.error(error);
    }
}