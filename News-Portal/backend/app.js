import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import profileRoutes from "./routes/profile.routes.js";
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

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);