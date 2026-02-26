// controllers/article.controller.js
import Article from "../models/journalist.model.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, category, images , state , city  } = req.body;

    //  Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        message: "Title, content, and category are required",
      });
    }

    //  Author from JWT (protect middleware)
    const authorId = req.user._id;

    //  Create article as draft
    const article = await Article.create({
      title,
      content,
      category,
        state,
        city,
      images: images || [],
      author: authorId,
      status: "draft",
    });

    res.status(201).json({
      success: true,
      message: "Article created successfully as draft",
      article,
    });

  } catch (error) {
    console.error("Create Article Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating article",
    });
  }
};


export const editArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const {
      title,
      content,
      category,
      state,
      city,
      images,
    } = req.body;

    //  Find article
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    //  Check ownership
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your own articles",
      });
    }

    //  Allow edit only for draft or rejected
    if (!["draft", "rejected"].includes(article.status)) {
      return res.status(400).json({
        success: false,
        message: "Approved or published articles cannot be edited",
      });
    }

    //  Update fields (only if provided)
    article.title = title || article.title;
    article.content = content || article.content;
    article.category = category || article.category;
    article.state = state || article.state;
    article.city = city || article.city;
    article.images = images || article.images;

    const updatedArticle = await article.save();

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article: updatedArticle,
    });

  } catch (error) {
    console.error("Edit Article Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while editing article",
    });
  }
};


export const submitForApproval = async (req, res) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    //  Ownership check
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can submit only your own articles",
      });
    }

    //  Allow submit only if draft or rejected
    if (!["draft", "rejected"].includes(article.status)) {
      return res.status(400).json({
        success: false,
        message: "Only draft or rejected articles can be submitted",
      });
    }

    //  Change status
    article.status = "pending";
    await article.save();

    res.status(200).json({
      success: true,
      message: "Article submitted for approval",
      article,
    });

  } catch (error) {
    console.error("Submit Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while submitting article",
    });
  }
};

export const viewArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findOneAndUpdate(
      { _id: articleId, status: "published" },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("author", "name");

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found or not published",
      });
    }

    res.status(200).json({
      success: true,
      article,
    });

  } catch (error) {
    console.error("View Article Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};