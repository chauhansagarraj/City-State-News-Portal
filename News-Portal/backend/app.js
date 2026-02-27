import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import { journalistRoutes } from "./routes/journalist.routes.js";
import journalistDashboardRoutes from "./routes/journalistDashboard.routes.js";
import readerRoutes from "./routes/reader.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import ratingsRoutes from "./routes/ratings.routes.js";
import readerDashboardRoutes from "./routes/readerDashboard.routes.js";
import advertiserRoutes from "./routes/advertiser.routes.js";
import advertiserDashboardRoutes from "./routes/advertiserDashboard.routes.js";
import "./utils/campaignSchedular.js";
import generateToken from "./utils/generateTokens.js";
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/journalist", journalistRoutes);
app.use("/api/journalist-dashboard", journalistDashboardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reader", readerRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/reader", readerDashboardRoutes);
app.use("/api/advertiser", advertiserRoutes);
app.use("/api/advertiser-dashboard", advertiserDashboardRoutes);
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

app.set("trust proxy", true);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);