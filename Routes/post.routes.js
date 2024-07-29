


const express = require("express");
const PostRouter = express.Router();
const Post_controller = require("../Controllers/post.controller")


PostRouter.post("/add",Post_controller.AddPost);
PostRouter.get("/get",Post_controller.GetPost)

module.exports = PostRouter;
