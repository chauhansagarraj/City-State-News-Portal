import mongoose from "mongoose";
import Article from "./journalist.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "journalist", "advertiser", "reader"],
      default: "reader",
    },

    // ================= JOURNALIST FIELDS =================
    pressCardNumber: String,
    organizationName: String,
    experienceYears: Number,
    organizationNumber: String,
    idProofImage: String, // Cloudinary URL

    // ================= ADVERTISER FIELDS =================
    companyName: String,
    gstNumber: String,
    companyWebsite: String,
    idProofImage: String, // Cloudinary URL 
    

    // ================= WALLET =================
wallet: {
  balance: { type: Number, default: 0 },

  transactionHistory: [
    {
      type: {
        type: String,
        enum: ["add", "spent", "refund"],
        required: true,
      },
      amount: { type: Number, required: true },

      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
      },

      description: String,

      date: { type: Date, default: Date.now },
    },
  ],
},

    // ================= ID VERIFICATION =================
    governmentIDNumber: String,
    idProofImage: String, // Cloudinary URL

    // ================= ADMIN APPROVAL =================
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "pending",
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    rejectionReason: String,

     savedArticles: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  }
],


    // ================= EMAIL VERIFICATION =================
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);