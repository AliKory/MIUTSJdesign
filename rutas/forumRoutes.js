const express = require("express");
   const router = express.Router();
   const Post = require("../models/Post");
   const Comment = require("../models/Comment");

   // Crear nuevo post
   router.post("/posts", async (req, res) => {
     const { title, content } = req.body;
     try {
       const post = await Post.create({ title, content });
       res.status(201).json(post);
     } catch (error) {
       console.error("Error creating post:", error);
       res.status(500).json({ error: "Failed to create post" });
     }
   });

   // Crar nuevo comentario 
   router.post("/posts/:postId/comments", async (req, res) => {
     const { postId } = req.params;
     const { content } = req.body;
     try {
       const post = await Post.findByPk(postId);
       if (!post) {
         return res.status(404).json({ error: "Post not found" });
       }
       const comment = await Comment.create({ content, postId });
       res.status(201).json(comment);
     } catch (error) {
       console.error("Error creating comment:", error);
       res.status(500).json({ error: "Failed to create comment" });
     }
   });

   // Traer todos los post
   router.get("/posts", async (req, res) => {
     try {
       const posts = await Post.findAll();
       res.status(200).json(posts);
     } catch (error) {
       console.error("Error retrieving posts:", error);
       res.status(500).json({ error: "Failed to retrieve posts" });
     }
   });