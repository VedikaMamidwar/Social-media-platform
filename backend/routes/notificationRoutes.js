import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    getNotifications,
    markAllAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

// Get all notifications
router.get("/", protect, getNotifications);

// Mark all as read
router.put("/read", protect, markAllAsRead);

export default router;