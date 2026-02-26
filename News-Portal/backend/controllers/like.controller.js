import Article from "../models/journalist.model.js";

export const toggleLikeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article || article.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    const userId = req.user._id;

    const alreadyLiked = article.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      article.likes = article.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      await article.save();

      return res.status(200).json({
        success: true,
        message: "Article unliked",
        totalLikes: article.likes.length,
        liked: false,
      });
    } else {
      // Like
      article.likes.push(userId);
      await article.save();

      return res.status(200).json({
        success: true,
        message: "Article liked",
        totalLikes: article.likes.length,
        liked: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getArticleLikes = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("likes", "name");

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      totalLikes: article.likes.length,
      likedUsers: article.likes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};