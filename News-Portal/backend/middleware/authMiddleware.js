import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//  Protect Middleware — Verify JWT
export const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (without password)
      req.user = await User.findById(decoded.id).select("-password");

      return next();

    } catch (err) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  // No token provided
  return res.status(401).json({ message: "No token provided" });
};