const express = require("express");
const Post = require("../model/Post");
const postRoute = express.Router();

/* Add Post */
postRoute.post("/posts/create", async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

/* Get all Posts*/
postRoute.get("/posts", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

/* Get Post by ID */
postRoute.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

/* Update Post */
postRoute.put("/posts/:id", async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

/* Delete Post */
postRoute.delete("/posts/:id", async (req, res, next) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = postRoute;
