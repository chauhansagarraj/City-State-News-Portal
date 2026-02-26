import Article from "../models/journalist.model.js";
import Comment from "../models/comment.model.js";

export const getReaderDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { city, state } = req.user; // assuming stored in user profile

    //  Recommended Articles (by location)
    const recommended = await Article.find({
      status: "published",
      $or: [{ city }, { state }],
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category city state images createdAt")
      .populate("author", "name");

    //  Liked Articles
    const likedArticles = await Article.find({
      status: "published",
      likes: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category city state images createdAt")
      .populate("author", "name");

    //  User Comments
    const comments = await Comment.find({
      user: userId,
      status: { $ne: "deleted" },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("article", "title");

    //  Activity Summary
    const totalLikes = await Article.countDocuments({
      likes: userId,
    });

    const totalComments = await Comment.countDocuments({
      user: userId,
      status: { $ne: "deleted" },
    });

    res.status(200).json({
      success: true,

      recommended,
      likedArticles,
      comments,

      activitySummary: {
        totalLikes,
        totalComments,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};