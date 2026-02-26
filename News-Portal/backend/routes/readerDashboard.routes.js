import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getReaderDashboard } from "../controllers/readerDashboard.js";

const router = express.Router();

router.get("/dashboard", protect, getReaderDashboard);

export default router;