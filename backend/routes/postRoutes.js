import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    toggleLikePost,
    toggleBookmarkPost,
    getBookmarkedPosts,
    addComment,

} from "../controllers/postController.js";

const router = express.Router();

/*
========================================
POST ROUTES
Base URL => /api/post
========================================
*/

/*
Create a new post
POST /api/post
Protected Route
*/
router.post("/", protect, createPost);

/*
Get all posts
GET /api/post
Public Route
*/
router.get("/", getAllPosts);

/*
Get bookmarked posts of logged-in user
GET /api/post/bookmarks
Protected Route
*/
router.get("/bookmarks", protect, getBookmarkedPosts);

/*
Get single post by ID
GET /api/post/:id
Public Route
*/


/*
Update a post
PUT /api/post/:id
Protected Route
Only post owner can update
*/
router.put("/:id", protect, updatePost);

/*
Like / Unlike a post
PUT /api/post/:id/like
Protected Route
*/
router.put("/:id/like", protect, toggleLikePost);

/*
Bookmark / Remove Bookmark
PUT /api/post/:id/bookmark
Protected Route
*/
router.put("/:id/bookmark", protect, toggleBookmarkPost);

/*
Add a comment
POST /api/post/:id/comment
Protected Route
*/
router.post("/:id/comment", protect, addComment);

/*
Delete a post
DELETE /api/post/:id
Protected Route
Only post owner can delete
*/
router.delete("/:id", protect, deletePost);

router.put("/:id/bookmark", protect, toggleBookmarkPost);


router.get("/:id", protect, getPostById);


export default router;