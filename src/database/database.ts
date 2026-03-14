import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sky",
  database: "skybookdb",
  synchronize: true,
  logging: true,
  entities: [User,Post],
});
