import jwt from "jsonwebtoken";
import { tokenType } from "../base/types";

const JWT_SECRET = ".m)fkOecQ4iUl8dhB/-mpkxO@5%VfAiCWcU%rc5H8D8";   //my secret key

export function generateToken(payload: tokenType): string {            //payload is the data sent with the request
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}
