import { getAdvertiserDashboard , getAdvertiserCampaigns , getWallet } from "../controllers/advertiserDashboard.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { verifyApprovedUser } from "../middleware/verifiedUser.js";
import express from "express";
const router = express.Router();

router.get("/", protect, authorizeRoles("advertiser"), verifyApprovedUser, getAdvertiserDashboard);
router.get("/campaigns", protect, authorizeRoles("advertiser"), verifyApprovedUser, getAdvertiserCampaigns);
router.get("/wallet", protect, authorizeRoles("advertiser"), verifyApprovedUser, getWallet);

export default router;