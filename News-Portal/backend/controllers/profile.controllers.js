import User from "../models/user.model.js";

export const completeProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.role === "reader")
      return res.status(400).json({
        message: "Readers do not require verification",
      });

    // Cloudinary uploaded file URL
    if (req.file) {
      updates.idProofImage = req.file.path;
    }

    // ===== Role validation =====

    if (user.role === "journalist") {
      if (
        !updates.pressCardNumber ||
        !updates.organizationName ||
        !updates.experienceYears ||
        !updates.governmentIDNumber ||
        !updates.organizationNumber ||
        !updates.idProofImage
      ) {
        return res.status(400).json({
          message: "All journalist verification fields required",
        });
      }
    }

    if (user.role === "advertiser") {
      if (
        !updates.companyName ||
        !updates.gstNumber ||
        !updates.companyWebsite ||
        !updates.governmentIDNumber ||
        !updates.idProofImage
      ) {
        return res.status(400).json({
          message: "All advertiser verification fields required",
        });
      }
    }

    Object.assign(user, updates);

    user.verificationStatus = "pending";
    user.rejectionReason = undefined;

    await user.save();

    res.json({
      message:
        "Profile submitted successfully. Awaiting admin approval.",
      user,
    });
  } catch (error) {
  console.error("FULL ERROR:", error);
  res.status(500).json({
    message: error.message,
    error: error
  });
}
};  