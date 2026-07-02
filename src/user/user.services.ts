import { Repository } from "typeorm";
import { AppDataSource } from "../database/database";
import { User } from "./user.entity";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { CreateUserDto } from "./user.dto";

export class UserService {
    private userRepo: Repository<User>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
    }

    async createUser(data: CreateUserDto): Promise<User> {

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

    async getUserByEmail(email: string){
        const user = await this.userRepo.findOneBy({
            email,
        });

        if (!user) {
            throw createHttpError.NotFound("User not found")
        }
        const { password, ...safeUser } = user;   
        return safeUser
    }
}





