import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction                
) {
   
    const authHeader = req.headers.authorization;  //get token at header in request while sending data
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    
    try {
        
        const decoded = verifyToken(token);     //verifies the token
        console.log("after verify token");

        console.log(decoded);
        (req as any)["user"]= decoded;            //attaching user info to request
        
        console.log("before next")
        next();       //calls next handler function, moves to controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}