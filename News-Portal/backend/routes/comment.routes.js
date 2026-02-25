import express from "express";
import {
  addComment,
  getCommentsByArticle,
  getCommentsForJournalist,
  deleteComment,
  hideComment,
  addReply,
  getCommentsWithReplies,
  deleteReply
} from "../controllers/comment.controller.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", protect, addComment);
router.post("/reply", protect, addReply);
router.get("/article/:articleId", getCommentsByArticle);
router.get("/commentWithReplies/:articleId", getCommentsWithReplies);

router.get("/journalist", protect,authorizeRoles("journalist"), getCommentsForJournalist);
router.delete("/delete/:id", protect, deleteComment);
router.delete("/reply/delete/:id", protect, deleteReply);
router.put("/hide/:id", protect, hideComment);

export default router;