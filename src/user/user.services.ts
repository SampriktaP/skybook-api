import { OptionalUnlessRequiredId, Repository } from "typeorm";
import { AppDataSource } from "../database/database";
import { LoginUserDto, SignUpUserDto } from "../user/user.dto";
import { User } from "./user.entity";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import createHttpError from "http-errors";

export class UserService {
    private userRepo: Repository<User>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
    }

    //signup
    async signup(data: SignUpUserDto): Promise<User> {

        // checking if user already exists?
        const existingUser = await this.userRepo.findOneBy({
            email: data.email,
        });

        if (existingUser) {
           throw createHttpError.BadRequest("User already exists!!!")    //throw new Error("User already exists");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // creating new user
        const user = this.userRepo.create({
            name: data.name,
            gender: data.gender,
            email: data.email,
            password: hashedPassword,   //store hashed password
        });

        //saves user to database
        return await this.userRepo.save(user);
    }


    //login
    async login(data: LoginUserDto){

        //checks if user exists?
        const user = await this.userRepo.findOneBy({
            email: data.email,
        });

        if (!user) {
            throw new Error("User not found");
        }

        //compare hashed password
        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
            
        //create token
        const token = generateToken({
            userId: user.id,
            email: user.email,
        });

        // remove password
        const { password, posts, ...safeUser } = user;

            
        return {
               
            user: safeUser,
            token,
            expiresIn: new Date().getTime() + 60 * 1000
      
        };
        

        /*checks password
        if (user.password !== data.password) {
            throw new Error("Invalid password");
        }*/

        //login successful
        //return user;
    }

    //get user
    // async getUser(id:string):Promise<User>{
    //     const user = await this.userRepo.findOne({
    //         where:{id},
    //         select:{
    //             id:true,
    //             name:true,
    //             email:true,
    //             createdAt: true
    //         }
    //     });

    //     if(!user){
    //         throw createHttpError.NotFound("User not found");
    //     }

    //     return user;
    // }

}




/*
const { name,gender,email } = data;

return {
    name,
    gender,
    email,
    createdAt: new Date()
};*/
