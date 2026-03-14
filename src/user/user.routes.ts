import { Router } from "express";
import { UserController } from "./user.controller";
import { LoginUserDto, SignUpUserDto } from "./user.dto";
import { dtoValidationMiddleware } from "../middlewares/dto.middleware";


const router = Router();
const userControl = new UserController();  //userControl is an object of UserController

router.post("/signup",dtoValidationMiddleware(SignUpUserDto),userControl.signup.bind(userControl));
router.post("/login",dtoValidationMiddleware(LoginUserDto),userControl.login.bind(userControl));
/* POST /user
router.post("/", testUser);*/

export default router;