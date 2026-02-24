import express from "express";
import { register, login } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { changePassword } from "../controllers/user.controller.js";
import { verifyApprovedUser } from "../middleware/verifiedUser.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected test routes

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

router.get("/journalist", protect, authorizeRoles("journalist"), (req, res) => {
  res.json({ message: "Journalist access granted" });
});

router.get("/advertiser", protect, authorizeRoles("advertiser"), (req, res) => {
  res.json({ message: "Advertiser access granted" });
});

router.get("/reader", protect, authorizeRoles("reader"), (req, res) => {
  res.json({ message: "Reader access granted" });
});

router.put("/change-password", protect, verifyApprovedUser, changePassword);
export default router;