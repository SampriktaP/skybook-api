import { Repository } from "typeorm";
import { AppDataSource } from "../database/database";

import { Like } from "./like.entity";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";

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

    const existingLike = await this.likeRepo.findOne({
      where: {
        user: {
          id: userId
        },
        post: {
          id: postId
        }
      },
      relations: {
        user: true,
        post: true
      }
    });

    if (existingLike) {
      await this.likeRepo.remove(existingLike);

      return {
        liked: false
      };
    }

    const user = await this.userRepo.findOne({
      where: {
        id: userId
      }
    });

    const post = await this.postRepo.findOne({
      where: {
        id: postId
      }
    });

    const like = new Like();

    like.user = user as User;
    like.post = post as Post;

    await this.likeRepo.save(like);

    return {
      liked: true
    };
  }
}