import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { completeProfile } from "../controllers/profile.controllers.js";
import multer from "multer";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Only logged-in users can complete profile
router.put(
  "/complete",
  protect,
  upload.single("idProofImage"), // 👈 file field name
  completeProfile
);
export default router;