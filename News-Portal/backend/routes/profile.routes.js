import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { completeProfile , getMyProfile , updateProfile } from "../controllers/profile.controllers.js";
import multer from "multer";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Only logged-in users can complete profile
router.put(
  "/complete",
  protect,
  upload.single("idProofImage"), //  file field name
  completeProfile
);

// Get current user's profile
router.get("/me", protect, upload.single("idProofImage"), getMyProfile);

// Update user's profile
router.put("/update", protect, upload.single("idProofImage"), updateProfile);


export default router;