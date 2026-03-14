import { NextFunction, Request, Response } from "express";
import { PostService } from "./post.service";


export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    async createPost(req: Request, res: Response, next: NextFunction) {
        try {

            const user = (req as any).user; //new line , to get logged in user

            //create post
            const post = await this.postService.createPost(req.body, user.userId);

            res.status(201).json({
                success: true,
                message: post
            });

        } catch (err: any) {
            next(err);

        }
    }

    async getPost(req: Request, res: Response, next: NextFunction) {
        const id: string = req.query.id as string
        try {
            const post = await this.postService.getPost(id);

            res.json({
                success: true,
                data: post,
            });

        } catch (err: any) {
            next(err);
        }
    }


    async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user; // will show logged user
            const postId = req.query.id as string;   // post id from URL

            await this.postService.deletePost(postId);

            res.status(200).json({
                success: true,
                message: "Post deleted successfully",
            });

        } catch (err: any) {
            next(err);
        }
    }

    async getPostsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user; 
            const page = req.query.page?Number(req.query.page):1
            const take = req.query.take?Number(req.query.take):10

            const result = await this.postService.getPostsByUser(user.userId, page, take);

            res.status(200).json({
                success: true,
                data: result.data,
                count: result.count,
                
            });
        } catch (err: any) {
            next(err);
        }
    }


    async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try { 
            const page = req.query.page?Number(req.query.page):1
            const take = req.query.take?Number(req.query.take):10

            const result = await this.postService.getAllPosts(page, take);

            res.status(200).json({
                success: true,
                data: result.data,
                count: result.count,
                
            });
        } catch (err: any) {
            next(err);
        }

    }
}