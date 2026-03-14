import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { Post } from "../post/post.entity";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  password: string;

  // One user can have many posts
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

}