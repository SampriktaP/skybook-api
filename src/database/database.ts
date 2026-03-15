import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";
import { config } from 'dotenv' 

config()
console.log(process.env.PGHOST)
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: process.env.PGSSLMODE === 'require' ? true : false,
  synchronize: true,
  logging: true,
  entities: [User,Post],
});
