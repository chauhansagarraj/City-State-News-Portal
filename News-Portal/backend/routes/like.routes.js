import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  toggleLikeArticle,
  getArticleLikes,
} from "../controllers/like.controller.js";

const router = express.Router();

// Like / Unlike article
router.post("/article/:id", protect, toggleLikeArticle);

// Get like details
router.get("/article/:id", getArticleLikes);

export default router;