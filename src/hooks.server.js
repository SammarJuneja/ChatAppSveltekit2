import { json, error } from "@sveltejs/kit";
import { connectDB, verifyAccessToken } from "./stores/store";
import config from "../config";
import jwt from "jsonwebtoken"

export async function handle({ event, resolve }) {
    console.log(2)
    await connectDB();
    console.log(3)

    if (event.url.pathname.startsWith("/api/user") || event.url.pathname.startsWith("/api/chat")) {

        const authHeader = event.request.headers.get("Authorization");

        if (!authHeader) {
            return json({ "error": "Authentication header is missing" }, { status: 401 });
        }

        const token = authHeader?.replace("Bearer ", "");

        if (!token) {
            return json({ error: "Authentication token is missing" }, { status: 401 });
        }

        console.log(token)

        try {
            const decodedToken = jwt.verify(token, config.JWT_ACCESS_SECRET);
            console.log(decodedToken)

            if (decodedToken) {
                console.log('Decoded Token:', decodedToken);
                event.locals.userId = decodedToken.userId;
                console.log('Setting userId:', event.locals.userId);
            } else {
                return json({ error: "Invalid or expired token" }, { status: 401 });
            }
            const response = await resolve(event);
            return response;
        } catch (error) {
            console.log(error);
            return json({ "error": "Internal server error" });
        }
    }
    const response = await resolve(event);
    return response;
}

export async function handleError({ error }) {
    console.error("An error occurred:", error);
    return {
        message: "An unexpected error occurred."
    };
}

export async function handleSession({ event }) {
    return {
        userId: event.locals.userId
    };
}