import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status ?? err.statusCode ?? 500;

    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}