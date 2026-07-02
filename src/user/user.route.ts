import { Router } from "express";
import { UserController } from "./user.controller";
import { CreateUserDto, LoginUserDto } from "./user.dto";
import { dtoValidationMiddleware } from "../middlewares/dto.middleware";


const router = Router();
const userControl = new UserController();  //userControl is an object of UserController

router.post("/create",dtoValidationMiddleware(CreateUserDto),userControl.onboard.bind(userControl));
router.post("/:email",dtoValidationMiddleware(LoginUserDto),userControl.getUserByEmail.bind(userControl));

export default router;