import express from "express";
import {
  createCampaign,
  getMyCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  submitCampaign,
  pauseCampaign,
  resumeCampaign,
  trackImpression,
  trackClick,
  addFunds
} from "../controllers/advertiser.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { verifyApprovedUser } from "../middleware/verifiedUser.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("advertiser"),verifyApprovedUser , createCampaign);
router.get("/campaign/my", protect,authorizeRoles("advertiser"),verifyApprovedUser,  getMyCampaigns);
router.get("/campaign/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, getCampaignById);
router.put("/update/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, updateCampaign);
router.delete("/delete/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, deleteCampaign);
router.post("/submit/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, submitCampaign);
router.put("/pause/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, pauseCampaign);
router.put("/resume/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, resumeCampaign);
router.post("/track/impression/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, trackImpression);
router.post("/track/click/:id", protect,authorizeRoles("advertiser"),verifyApprovedUser, trackClick);
router.post("/add-funds", protect,authorizeRoles("advertiser"),verifyApprovedUser, addFunds);

export default router;