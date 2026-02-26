import Article from "../models/journalist.model.js";

export const rateArticle = async (req, res) => {
  try {
    const { value } = req.body;
    const userId = req.user._id;

    if (!value || value < 1 || value > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const article = await Article.findById(req.params.id);

    if (!article || article.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // Check if user already rated
    const existingRating = article.ratings.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (existingRating) {
      // Update rating
      existingRating.value = value;
    } else {
      // Add new rating
      article.ratings.push({
        user: userId,
        value,
      });
    }

    // Recalculate average
    const total = article.ratings.reduce((sum, r) => sum + r.value, 0);
    article.averageRating = total / article.ratings.length;

    await article.save();

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully",
      averageRating: article.averageRating,
      totalRatings: article.ratings.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};