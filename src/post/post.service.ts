import { Repository } from "typeorm";
import { AppDataSource } from "../database/database";
import { Post } from "./post.entity";
import { CreatePostDto } from "../post/post.dto";
import createHttpError from "http-errors";
import { User } from "../user/user.entity";


export class PostService {
  private postRepo: Repository<Post>;
  private userRepo: Repository<User>;

  constructor() {
    this.postRepo = AppDataSource.getRepository(Post);
    this.userRepo = AppDataSource.getRepository(User);
  }

  async createPost(data: CreatePostDto, user_id: string): Promise<Post> {
    const post = new Post();
    post.caption = data.caption;
    //post.user_id = user_id;  
    const user = await this.userRepo.findOne({
      where: { id: user_id }
    })
    post.user = user as User; //user considered as User data type
    post.image_url = data.image_url;
    post.video_url = data.video_url;

    return await this.postRepo.save(post);
  }

  async getPost(id: string): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: {
        user: true,//joining user table with post
      },
      select: {
        id: true,
        caption: true,
        createdAt: true,
        user: {
          id: true,
          name: true,
          gender: true,
        },
      },
    });
    if (!post) {
      throw createHttpError.NotFound("Error fetching post")
    }

    return post;
  }



  async deletePost(id: string): Promise<void> {
    const post = await this.postRepo.findOne({
      where: {
        id
      }
    });

    if (!post) {
      throw createHttpError.NotFound("Post not found or not authorized");
    }

    await this.postRepo.remove(post);
  }

  async getPostsByUser(user_id: string, page: number = 1, take: number = 10) { //default param 1 and 10
    const [data, count] = await this.postRepo.findAndCount(
      {
        where: {
          user: {
            id: user_id
          }
        },
        order: {
          createdAt: "DESC"
        },
        take: take,
        skip: (page - 1) * take
      }
    );
    return {
      data, count
    }
  }

  async getAllPosts(page: number = 1, take: number = 10) {
    const [data, count] = await this.postRepo.findAndCount(
      {
        relations: {
          user:true
        },
        select: {
        user: {
          id: true,
          name: true,
        },
      },
        order: {
          createdAt: "DESC"
        },
        take: take,
        skip: (page - 1) * take

      }
    );
    return {
      data, count
    }
  }

}
