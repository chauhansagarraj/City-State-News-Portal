import Article from "../models/journalist.model.js";

export const getJournalistDashboard = async (req, res) => {
  try {
    const journalistId = req.user._id;

    // 📰 Fetch journalist articles
    const articles = await Article.find({ author: journalistId })
      .sort({ createdAt: -1 });

    // 📊 Statistics
    const totalArticles = articles.length;

    const drafts = articles.filter(a => a.status === "draft").length;
    const pending = articles.filter(a => a.status === "pending").length;
    const rejected = articles.filter(a => a.status === "rejected").length;
    const published = articles.filter(a => a.status === "published").length;

    // 👁️ Total views across all articles
    const totalViews = articles.reduce(
      (sum, article) => sum + article.views,
      0
    );

    res.status(200).json({
      success: true,

      stats: {
        totalArticles,
        drafts,
        pending,
        rejected,
        published,
        totalViews,
      },

      articles,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard",
    });
  }
};

