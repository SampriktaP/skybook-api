import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function dtoValidationMiddleware(dtoClass:any){
    
    return async(req:Request,res:Response,next:NextFunction)=>{
        const dto = plainToInstance(dtoClass, req.body);    //converts requests to DTO object
    
        const errors = await validate(dto);                      //validates DTO  
        if (errors.length > 0) {
          return res.status(400).json({
            success: false,
            errors: errors.map(e => e.constraints)
          });
        }

        next();
    };
   
}
  