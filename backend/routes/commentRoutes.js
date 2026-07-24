import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id", protect, addComment);

router.put("/:id", protect, updateComment);

router.delete("/:id", protect, deleteComment);

export default router;