import express from "express";
import { getJournalistDashboard } from "../controllers/journalistDashboard.js";
import { protect } from "../middleware/authMiddleware.js";
import { verifyApprovedUser } from "../middleware/verifiedUser.js";

const router = express.Router();

// 🧑‍💻 Journalist Dashboard
router.get(
  "/",
  protect,
  verifyApprovedUser,
  getJournalistDashboard
);

export default router;