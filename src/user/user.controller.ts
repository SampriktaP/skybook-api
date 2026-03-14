import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserService } from "./user.services";
import { LoginUserDto, SignUpUserDto } from "./user.dto";



export class UserController {
  private userServ: UserService;

  constructor() {
    this.userServ = new UserService();
  }

  //signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userServ.signup(req.body)

      res.status(201).json({
        success: true,
        data: user,
      });
    }
    catch (err: any) {
      next(err);

    }
  }


  //login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userServ.login(req.body);

      res.status(200).json({
        success: true,
        message: "Login Successful",
        data: user,
      });
    }
    catch (err: any) {
      next(err);

    }
  }


}










