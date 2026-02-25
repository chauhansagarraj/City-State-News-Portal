import Comment from "../models/comment.model.js";
import Article from "../models/journalist.model.js";

// Add comment to article
export const addComment = async (req, res) => {
  try {
    const { articleId, content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Comment content is required",
      });
    }

    const article = await Article.findById(articleId);

    if (!article || article.status !== "published") {
      return res.status(404).json({
        message: "Article not found or not published",
      });
    }

    const comment = await Comment.create({
      article: articleId,
      user: req.user._id,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while adding comment",
    });
  }
};

export const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await Comment.find({
      article: articleId,
      status: "visible",
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: comments.length,
      comments,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching comments",
    });
  }
};

export const getCommentsForJournalist = async (req, res) => {
  try {
    const journalistId = req.user._id;

    const comments = await Comment.find()
      .populate({
        path: "article",
        match: { author: journalistId },
        select: "title",
      })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const filteredComments = comments.filter(c => c.article !== null);

    res.status(200).json({
      success: true,
      total: filteredComments.length,
      comments: filteredComments,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching journalist comments",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Allow only owner or admin
    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this comment",
      });
    }

    comment.status = "deleted";
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting comment",
    });
  }
};

export const hideComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    comment.status = "hidden";
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment hidden successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while hiding comment",
    });
  }
};

export const addReply = async (req, res) => {
  try {
    const { articleId, parentCommentId, content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Reply content is required",
      });
    }

    const article = await Article.findById(articleId);

    if (!article || article.status !== "published") {
      return res.status(404).json({
        message: "Article not found or not published",
      });
    }

    const parent = await Comment.findById(parentCommentId);

    if (!parent || parent.parentComment !== null) {
      return res.status(400).json({
        message: "Invalid parent comment",
      });
    }

    const reply = await Comment.create({
      article: articleId,
      user: req.user._id,
      content,
      parentComment: parentCommentId,
    });

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      reply,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while adding reply",
    });
  }
};

export const getCommentsWithReplies = async (req, res) => {
  try {
    const { articleId } = req.params;

    // Main comments
    const comments = await Comment.find({
      article: articleId,
      parentComment: null,
      status: "visible",
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    // Attach replies
    const result = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({
          parentComment: comment._id,
          status: "visible",
        })
          .populate("user", "name")
          .sort({ createdAt: 1 });

        return {
          ...comment.toObject(),
          replies,
        };
      })
    );

    res.status(200).json({
      success: true,
      totalComments: result.length,
      comments: result,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching comments",
    });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;

    const reply = await Comment.findById(id);

    if (!reply) {
      return res.status(404).json({
        message: "Reply not found",
      });
    }

    if (
      reply.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this reply",
      });
    }

    reply.status = "deleted";
    await reply.save();

    res.status(200).json({
      success: true,
      message: "Reply deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting reply",
    });
  }
};