import User from "../models/user.model.js";


//  1. Get Pending Users (Journalist & Advertiser)
export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["journalist", "advertiser"] },
      verificationStatus: "pending",
    }).select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  2. Approve User
export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.verificationStatus = "approved";
    user.rejectionReason = undefined;

    await user.save();

    res.json({ message: "User approved successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  3. Reject User (Keep record — DO NOT DELETE)
export const rejectUser = async (req, res) => {
  try {
    const { reason } = req.body;

    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.verificationStatus = "rejected";
    user.rejectionReason = reason || "Not specified";

    await user.save();

    res.json({ message: "User rejected successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  4. Block User
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.status = "blocked";

    await user.save();

    res.json({ message: "User blocked successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  5. Unblock User
export const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.status = "active";

    await user.save();

    res.json({ message: "User unblocked successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  6. Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};