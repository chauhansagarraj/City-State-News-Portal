import Article from "../models/journalist.model.js";

export const getAllPublishedArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find({ status: "published" })
      .select(
        "title content category city state images createdAt likes views ratings averageRating",
      )
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments({ status: "published" });

    const formattedArticles = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      excerpt: article.content.substring(0, 180) + "...",
      category: article.category,
      city: article.city,
      state: article.state,
      image: article.images[0] || null,
      author: article.author?.name,
      createdAt: article.createdAt,
      likesCount: article.likes.length,
      views: article.views,
      averageRating: article.averageRating,
      totalRatings: article.ratings.length,
    }));

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalArticles: total,
      articles: formattedArticles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleArticleDetails = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      status: "published",
    }).populate("author", "name email");

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      article: {
        ...article._doc,

        //  Likes
        likesCount: article.likes.length,

        //  Ratings
        averageRating: article.averageRating,
        totalRatings: article.ratings.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchArticles = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const articles = await Article.find({
      status: "published",
      $or: [
        { title: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .select(
        "title content category city state images createdAt views ",
      )
      .populate("author", "name")
      .sort({ createdAt: -1 });

    const formatted = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      excerpt: article.content.substring(0, 180) + "...",
      image: article.images[0] || null,
      category: article.category,
      city: article.city,
      state: article.state,
      author: article.author?.name,
      views: article.views,
    }));

    res.status(200).json({
      success: true,
      totalResults: formatted.length,
      articles: formatted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterArticles = async (req, res) => {
  try {
    const { category, city, state } = req.query;

    const filter = { status: "published" };

    if (category) filter.category = category;
    if (city) filter.city = city;
    if (state) filter.state = state;

    const articles = await Article.find(filter)
      .select("title content category city state images createdAt")
      .populate("author", "name")
      .sort({ createdAt: -1 });

    const formatted = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      excerpt: article.content.substring(0, 180) + "...",
      image: article.images[0] || null,
      category: article.category,
      city: article.city,
      state: article.state,
      author: article.author?.name,
    }));

    res.status(200).json({
      success: true,
      totalResults: formatted.length,
      articles: formatted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
