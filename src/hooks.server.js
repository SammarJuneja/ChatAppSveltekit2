import { json, error } from "@sveltejs/kit";
import { connectDB, verifyRefreshToken} from "./stores/store";

export async function handle({ event, resolve }) {
    await connectDB();

    if (event.url.pathname.startsWith("/api/user") || event.url.pathname.startsWith("/api/chat")) {

        const authHeader = event.request.headers.get("Authorization");

        if (!authHeader) {
            return json({ "error": "Authentication header is missing" }, { status: 401 });
        }

        const token = authHeader?.replace("Bearer ", "");

        if (!token) {
            return json({ error: "Authentication token is missing" }, { status: 401 });
        }

        try {
            const decodedToken = verifyRefreshToken(token);

            if (decodedToken) {
                event.locals.userId = decodedToken.userId;
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