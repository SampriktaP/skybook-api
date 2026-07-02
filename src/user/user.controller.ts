import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { responseHandler } from "../middlewares/response.middleware";
import createHttpError from "http-errors";

export class UserController {
  private userServ: UserService;

  constructor() {
    this.userServ = new UserService();
  }

  async onboard(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userServ.createUser(req.body)
      responseHandler(user, res)
    }
    catch (err: any) {
      next(err);
    }
  }


  //login
  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email as string;
      if(!email)
        throw createHttpError.BadRequest("invalid email")
      const user = await this.userServ.getUserByEmail(email)
      responseHandler(user, res)
    }
    catch (err: any) {
      next(err);
    }
  }


}










