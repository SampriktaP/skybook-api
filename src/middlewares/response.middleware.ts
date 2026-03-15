import { Response } from "express";

export const responseHandler = (data: any, res:Response) =>{
    res.status(200).json({
        success: true,
        message: data
    })
}