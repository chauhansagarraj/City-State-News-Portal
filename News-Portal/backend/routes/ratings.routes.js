import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { rateArticle } from "../controllers/ratings.controller.js";

const router = express.Router();

router.post("/article/:id", protect, rateArticle);

export default router;