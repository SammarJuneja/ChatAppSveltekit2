import mongoose from"mongoose";
import jwt from"jsonwebtoken";
import config from "../../config.js";

export const logo = "https://media.discordapp.net/attachments/916361716965707836/1277165337825251338/OpenChat.png?ex=66cc2c69&is=66cadae9&hm=7e62f9d41dbfb54c7857ee8826c900759630569fb5953adca4762a9480b90712&";

export const apiUrl = "http://localhost:4000/api";

export const JWT_ACCESS_TOKEN = config.JWT_ACCESS_SECRET;
export const JWT_REFRESH_TOKEN = config.JWT_REFRESH_SECRET;

export const signAccessToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, JWT_ACCESS_TOKEN, { expiresIn });
}

export const signRefreshToken = (payload, expiresIn = "7d") => {
    return jwt.sign(payload, JWT_REFRESH_TOKEN, { expiresIn });
}

export const verifyAccessToken = (token) => {
    try {
        console.log(token, JWT_ACCESS_TOKEN)
        const verified = jwt.verify(token, JWT_ACCESS_TOKEN);
        console.log(token, verified, JWT_ACCESS_TOKEN)
        return verified;
    } catch (error) {
        console.log(error)
    }
}

export const verifyRefreshToken = (token) => {
    try {
        const verified = jwt.verify(token, JWT_REFRESH_TOKEN);
        return verified;
    } catch (error) {
        console.log(error)
    }
}

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(config.MONGO, { serverSelectionTimeoutMS: 5000 });
            console.log("MongoDb is connected");
        }
        return mongoose.connection;
    } catch (error) {
        console.error(error);
    }
}