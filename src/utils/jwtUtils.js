import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const mySecret = process.env.MY_SECRET;
// bestämmelser vid ett gebererat token. tyoken är bara vlid i 15 minuter
function generate(claims) {
    let options = {
        issuer: "Chat-app",
        subject: "Auth token for chat-app api",
        expiresIn: "1h",
    };
    return jwt.sign(claims, mySecret, options);
}
function verify(token) {
    return jwt.verify(token, mySecret);
}

export default { generate, verify };
