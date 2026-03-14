import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("posts")
export class Post {

  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({ type: "text" })
  caption:string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  video_url: string;

  @CreateDateColumn()
  createdAt: Date;


 
  @ManyToOne(() => User, (users: { posts: any; }) => users.posts)  //since one user can have many posts 
  user: User;
}