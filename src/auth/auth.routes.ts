// import { Router } from "express";
// import { UserController } from "./auth.controller";
// import { LoginUserDto, SignUpUserDto } from "./auth.dto";
// import { dtoValidationMiddleware } from "../middlewares/dto.middleware";


// const router = Router();
// const userControl = new UserController();  //userControl is an object of UserController

// router.post("/signup",dtoValidationMiddleware(SignUpUserDto),userControl.signup.bind(userControl));
// router.post("/login",dtoValidationMiddleware(LoginUserDto),userControl.login.bind(userControl));

// export default router;