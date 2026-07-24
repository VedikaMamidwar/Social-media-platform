import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    toggleFollowUser,
    getUserProfile,
    updateProfile,
    searchUsers,
    toggleSavePost,
    getSavedPosts,
    getFollowers,
    getFollowing,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/profile/:id", protect, getUserProfile);
router.put("/profile", protect, updateProfile);

router.get("/search", protect, searchUsers);

router.put("/follow/:id", protect, toggleFollowUser);

router.put("/save/:id", protect, toggleSavePost);

router.get("/saved", protect, getSavedPosts);

router.get("/followers/:id", protect, getFollowers);

router.get("/following/:id", protect, getFollowing);

export default router;