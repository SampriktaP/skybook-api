import jwt from "jsonwebtoken";
import { tokenType } from "../base/types";
import { config } from "dotenv";

interface Token{   //creating a complex data type
    token:string,
    expiresIn:number
}

config()
const JWT_SECRET =process.env.JWT_SECRET as jwt.Secret;
export function generateToken(payload: tokenType): Token {            //payload is the data sent with the request
    return{
        token :jwt.sign(payload, JWT_SECRET, { expiresIn: "1m" }),
        expiresIn:new Date().getTime() + 60 * 1000    //1000 is ms hence 60 sec 
    };
    

}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}
