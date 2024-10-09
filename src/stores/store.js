import mongoose from"mongoose";
import jwt from"jsonwebtoken";
import config from "../../config.js";
import { writable } from "svelte/store";

function oldSearchResults() {
    const { subscribe, update } = writable([]);

    return {
        subscribe,
        add: (item) => {
            update((array) => {
                const newArray = [...array, item];
                return newArray.length > 10 ? newArray.slice(-10) : newArray;
            });
        },
    };
}

export const oldSearch = oldSearchResults();

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