import express from "express";
import { AppDataSource } from "./database/database";
import postRoutes from "./post/post.route"
import userRoutes from "./user/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { responseHandler } from "./middlewares/response.middleware";
import cors from "cors";
const app = express();

app.use(cors())
app.use(express.json());

//app.use(express.urlencoded({extended:true}))  //force transfer to json

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    console.log(AppDataSource.isInitialized);

    app.use("/user", userRoutes);
    app.use("/post", postRoutes);

    app.use(responseHandler);
    app.use(errorHandler);

    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });

  
