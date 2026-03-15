import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserService } from "./user.services";
import { LoginUserDto, SignUpUserDto } from "./user.dto";
import { responseHandler } from "../middlewares/response.middleware";



export class UserController {
  private userServ: UserService;

  constructor() {
    this.userServ = new UserService();
  }

  //signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userServ.signup(req.body)
      responseHandler(user, res)
    }
    catch (err: any) {
      next(err);

    }
  }


  //login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userServ.login(req.body);
      responseHandler(user, res)
    }
    catch (err: any) {
      next(err);

    }
  }


}










