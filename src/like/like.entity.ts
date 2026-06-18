import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post)
  post: Post;
}