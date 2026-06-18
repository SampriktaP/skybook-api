import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { LikeController } from "./like.controller";

const router = Router();

const likeController = new LikeController();

router.use(authMiddleware);

router.post(
    "/:postId",
    likeController.toggleLike.bind(likeController)
);

export default router;