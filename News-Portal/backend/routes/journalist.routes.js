import  {createArticle , editArticle , submitForApproval , viewArticle}  from "../controllers/articles.controller.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { verifyApprovedUser } from "../middleware/verifiedUser.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

// Create article (Journalists only)

router.post(
  "/articles",
  protect,
  authorizeRoles("journalist"),
  upload.array("images"),
  verifyApprovedUser,
  createArticle,
);
router.put(
  "/edit/:id",
  protect,
  authorizeRoles("journalist"),
  upload.array("images"),
  verifyApprovedUser,
  editArticle,
);
router.put(
  "/submit/:id",
  protect,
  authorizeRoles("journalist"),
  verifyApprovedUser,
  submitForApproval,
);
router.get(
  "/view/:id",
  protect,
  authorizeRoles("journalist"),
  verifyApprovedUser,
  viewArticle,
);

export { router as journalistRoutes };