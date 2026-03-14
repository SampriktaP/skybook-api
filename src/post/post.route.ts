import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { dtoValidationMiddleware } from "../middlewares/dto.middleware";
import { CreatePostDto } from "./post.dto";
import { PostController } from "./post.controller";

const router = Router();
const postController = new PostController();

router.use(authMiddleware)  //being used for all in this post router
router.post("/create",dtoValidationMiddleware(CreatePostDto),postController.createPost.bind(postController));
router.get("/search",postController.getPost.bind(postController));
router.delete("/delete",postController.deletePost.bind(postController));
router.get("/all/user",postController.getPostsByUser.bind(postController))
router.get("/all",postController.getAllPosts.bind(postController))

export default router;