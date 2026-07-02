import { Repository } from "typeorm";
import { AppDataSource } from "../database/database";
import { Like } from "./like.entity";
import { Post } from "../post/post.entity";
import { User } from "../user/user.entity";

export class LikeService {
  private likeRepo: Repository<Like>;
  private userRepo: Repository<User>;
  private postRepo: Repository<Post>;

  constructor() {
    this.likeRepo = AppDataSource.getRepository(Like);
    this.userRepo = AppDataSource.getRepository(User);
    this.postRepo = AppDataSource.getRepository(Post);
  }

  async toggleLike(postId: string, userId: string) {
    // FIX: Removed the 'relations' block completely to stop the circular reference crash
    const existingLike = await this.likeRepo.findOne({
      where: {
        user: {
          id: userId,
          
        },
        post: {
          id: postId
        },

      },

    });

    const post = await this.postRepo.findOne({
      where: {
        id: postId
      }
    });


    if (!post) {
      throw new Error("Post not found");
    }
    
    if (existingLike) {
      await this.likeRepo.remove(existingLike);

      post.likecount -= 1
      this.postRepo.save(post)


      return {
        liked: false,
        likecount:post.likecount
      };
    }

    const user = await this.userRepo.findOne({
      where: {
        id: userId
      }
    });

    const like = new Like();
    like.user = user as User;
    post.likecount += 1;
    like.post = post;

    await this.postRepo.save(post);
    await this.likeRepo.save(like);
  

    return {
      liked: true,
      likecount:post.likecount
    };
  }
}