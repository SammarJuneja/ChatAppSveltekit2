require("dotenv").config();

const config = {
    "MONGO": process.env.MONGO_URI,
    "JWT_REFRESH_SECRET": process.env.JWT_REFRESH_SECRET,
    "JWT_ACCESS_SECRET": process.env.JWT_ACCESS_SECRET,
    "LOGO_LINK": process.env.LOGO_LINK,
    "PORT": process.env.PORT
}

export default config;