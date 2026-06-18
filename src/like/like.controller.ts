import { NextFunction, Request, Response } from "express";
import { LikeService } from "./like.service";

export class LikeController {

    private likeService: LikeService;

    constructor() {
        this.likeService = new LikeService();
    }

    async toggleLike(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const user = (req as any).user;

            const postId = req.params.postId as string;

            const result = await this.likeService.toggleLike(
                postId,
                user.userId
            );
            console.log(result);

            res.status(200).json({
                success: true,
                message: result
            });

        } catch (err: any) {
            next(err);
        }
    }
}