import { Request, Response } from "express";

export const responseHandler = (message:{data:any,code:number},req: Request, res:Response) =>{
    res.status(200).json({
        success: true,
        message: message.data
    })
}