import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    advertiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    media: {
      url: { type: String,
        //  required: true
         },
      type: {
        type: String,
        enum: ["image", "video", "gif"],
        // required: true,
      },
    },

    placement: {
      type: String,
      enum: [
        "homepage_top",
        "homepage_middle",
        "sidebar",
        "article_top",
        "article_bottom",
        "footer",
      ],
      required: true,
    },

    target: {
      city: { type: String, default: "All" },
      state: { type: String, default: "All" },
    },

    budget: {
      total: { type: Number, required: true },
      spent: { type: Number, default: 0 },
      costPerClick: { type: Number, default: 5 },
      costPerImpression: { type: Number, default: 0.5 },
    },

    schedule: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },

    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "approved",
        "active",
        "paused",
        "rejected",
        "completed",
      ],
      default: "draft",
    },


    analytics: {
      impressions: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
        lastImpressions: [
    {
      ip: String,
      time: Date,
    },
  ],
        lastClicks: [
    {
      ip: String,
      time: Date,
    },
  ],
    },

    rejectionReason: String,
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);