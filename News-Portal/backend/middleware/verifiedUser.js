// middleware/verifyApprovedUser.js
export const verifyApprovedUser = (req, res, next) => {
  // req.user is already attached by protect middleware
  if (!req.user) {
    return res.status(401).json({ message: "User not found in request" });
  }

  if (req.user.verificationStatus !== "approved") {
    return res
      .status(403)
      .json({ message: "Your account is not approved yet" });
  }

  next();
};