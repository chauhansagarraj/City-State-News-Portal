import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateTokens.js";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, city } = req.body;

    // Prevent admin self-registration
    if (role === "admin") {
      return res.status(403).json({
        message: "Admin registration not allowed",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Readers auto-approved, others pending
    const verificationStatus =
      role === "reader" ? "approved" : "pending";

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      city,
      verificationStatus,
    });

    //  Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message:
        role === "reader"
          ? "Registration successful"
          : "Registration successful. Please complete profile for verification.",

      token, //  NOW TOKEN INCLUDED

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verificationStatus: user.verificationStatus,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Account blocked by admin",
      });
    }

    // Allow login even if pending (for profile completion)
    // Only restrict features later via middleware

    const token = generateToken(user._id, user.role);

    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verificationStatus: user.verificationStatus,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CHANGE PASSWORD =================


export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password required",
      });
    }

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};