import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  getPendingUsers,
  approveUser,
  rejectUser,
  blockUser,
  unblockUser,
  getAllUsers,
  getPendingArticles,
  approveArticle,
  rejectArticle,
  publishArticle,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Only Admin can access all routes

router.get(
  "/pending",
  protect,
  authorizeRoles("admin"),
  getPendingUsers
);

router.put(
  "/approve/:id",
  protect,
  authorizeRoles("admin"),
  approveUser
);

router.put(
  "/reject/:id",
  protect,
  authorizeRoles("admin"),
  rejectUser
);

router.put(
  "/block/:id",
  protect,
  authorizeRoles("admin"),
  blockUser
);

router.put(
  "/unblock/:id",
  protect,
  authorizeRoles("admin"),
  unblockUser
);

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/pendingArticles",
  protect,
  authorizeRoles("admin"),
  getPendingArticles
);

router.put(
  "/approveArticle/:id",
  protect,
  authorizeRoles("admin"),
  approveArticle
);

router.put(
  "/rejectArticle/:id",
  protect,
  authorizeRoles("admin"),
  rejectArticle
);

router.put(
  "/publishArticle/:id",
  protect,
  authorizeRoles("admin"),
  publishArticle
);

export default router;