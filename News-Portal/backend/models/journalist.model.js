// models/article.model.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Politics",
        "Sports",
        "Business",
        "Entertainment",
        "Technology",
        "Crime",
        "Health",
        "Education",
        "Environment",
        "Science",
        "World",
        "Local",
        "Opinion",
      ],
      required: true,
    },

    state: {
      type: String,
      required: true,
      // Gujarat, Maharashtra, etc.
    },

    city: {
      type: String,
      required: true,
      // Ahmedabad, Surat, etc.
    },

    images: [
      {
        type: String, // URL or file path
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected", "published"],
      default: "draft",
    },

    views: {
      type: Number,
      default: 0,
    },

    rejectionReason: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        value: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Article", articleSchema);
