import { Router } from "express";
import userRoutes from './user/user.route'
import postRoutes from './post/post.route'
import likeRoutes from './like/like.route'

const mainRouter = Router()
mainRouter.use("/user", userRoutes);
mainRouter.use("/post", postRoutes);
mainRouter.use("/like", likeRoutes);

export default mainRouter