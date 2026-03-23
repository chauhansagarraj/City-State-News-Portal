import express from "express";
import {
  getAllPublishedArticles,
  getSingleArticleDetails,
  searchArticles,
  filterArticles,
  toggleBookmark
} from "../controllers/reader.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all published articles (with filters + pagination)
router.get("/articles", getAllPublishedArticles);

// Get single article full details
router.get("/articles/:id", getSingleArticleDetails);

// Search articles
router.get("/search", searchArticles);

// Filter by category / city / state
router.get("/filter", filterArticles);

// Toggle bookmark
router.post("/bookmark/toggle", protect, toggleBookmark);


export default router;