import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import createHttpError from "http-errors";


export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction                
) {
   
    const authHeader = req.headers.authorization;  //get token at header in request while sending data
    
    
    try {
        if (!authHeader) {
            throw createHttpError.Unauthorized("Token missing")
            // return res.status(401).json({ message: "Token missing" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);     //verifies the token
        (req as any)["user"]= decoded;            //attaching user info to request
        next();       //calls next handler function, moves to controller
    } catch (error) {
        next(error)
        // return res.status(401).json({ message: "Invalid token" });
    }
}


