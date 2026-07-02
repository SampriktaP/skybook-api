/*

export interface CreateUserDto {
    name: string;
    gender: string;
    email: string;
}
    
*/

import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpUserDto {     // POST /signup

  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password:string;
}


export class LoginUserDto {      // POST /login

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
