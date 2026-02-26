import User from "../models/user.model.js";
import Article from "../models/journalist.model.js";
import Campaign from "../models/advertiser.model.js";

//  1. Get Pending Users (Journalist & Advertiser)
export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["journalist", "advertiser"] },
      verificationStatus: "pending",
    }).select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  2. Approve User
export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.verificationStatus = "approved";
    user.rejectionReason = undefined;

    await user.save();

    res.json({ message: "User approved successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  3. Reject User (Keep record — DO NOT DELETE)
export const rejectUser = async (req, res) => {
  try {
    const { reason } = req.body;

    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.verificationStatus = "rejected";
    user.rejectionReason = reason || "Not specified";

    await user.save();

    res.json({ message: "User rejected successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  4. Block User
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.status = "blocked";

    await user.save();

    res.json({ message: "User blocked successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  5. Unblock User
export const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.status = "active";

    await user.save();

    res.json({ message: "User unblocked successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  6. Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPendingArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "pending" })
      .populate("author", "name email");

    res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });

  } catch (error) {
    console.error("Fetch Pending Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const approveArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    if (article.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending articles can be approved",
      });
    }

    article.status = "approved";
    await article.save();

    res.status(200).json({
      success: true,
      message: "Article approved successfully",
      article,
    });

  } catch (error) {
    console.error("Approve Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const rejectArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const { reason } = req.body;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    if (article.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending articles can be rejected",
      });
    }

    article.status = "rejected";
    article.rejectionReason = reason || "Not specified";

    await article.save();

    res.status(200).json({
      success: true,
      message: "Article rejected",
      article,
    });

  } catch (error) {
    console.error("Reject Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const publishArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    if (article.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Only approved articles can be published",
      });
    }

    article.status = "published";
    article.publishedAt = new Date();

    await article.save();

    res.status(200).json({
      success: true,
      message: "Article published successfully",
      article,
    });

  } catch (error) {
    console.error("Publish Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPendingCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({
    status: "pending",
  }).populate("advertiser", "name email");

  res.json(campaigns);
};

export const approveCampaign = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign)
    return res.status(404).json({ message: "Campaign not found" });

  campaign.status = "approved";

  await campaign.save();

  res.json({ message: "Campaign approved" });
};

export const rejectCampaign = async (req, res) => {
  const { reason } = req.body;

  const campaign = await Campaign.findById(req.params.id);

  if (!campaign)
    return res.status(404).json({ message: "Campaign not found" });

  campaign.status = "rejected";
  campaign.rejectionReason = reason;

  await campaign.save();

  res.json({ message: "Campaign rejected" });
};

export const getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find()
    .populate("advertiser", "name email")
    .sort({ createdAt: -1 });

  res.json(campaigns);
};