import User from "../models/user.model.js";
import Article from "../models/journalist.model.js";
import Campaign from "../models/advertiser.model.js";

export const getAdminDashboard = async (req, res) => {
  try {
    // ================= USERS =================

    const totalUsers = await User.countDocuments();

    const activeUsers = await User.countDocuments({
      status: "active",
    });

    const blockedUsers = await User.countDocuments({
      status: "blocked",
    });

    const advertisers = await User.countDocuments({
      role: "advertiser",
    });

    const journalists = await User.countDocuments({
      role: "journalist",
    });

    const readers = await User.countDocuments({
      role: "reader",
    });

    // ================= ARTICLES =================

    const totalArticles = await Article.countDocuments();

    const pendingArticles = await Article.countDocuments({
      status: "pending",
    });

    const publishedArticles = await Article.countDocuments({
      status: "published",
    });

    const rejectedArticles = await Article.countDocuments({
      status: "rejected",
    });

    // ================= CAMPAIGNS =================

    const totalCampaigns = await Campaign.countDocuments();

    const activeCampaigns = await Campaign.countDocuments({
      status: "active",
    });

    const pendingCampaigns = await Campaign.countDocuments({
      status: "pending",
    });

    const completedCampaigns = await Campaign.countDocuments({
      status: "completed",
    });

    const rejectedCampaigns = await Campaign.countDocuments({
      status: "rejected",
    });

    // ================= REVENUE =================

    const campaigns = await Campaign.find();

    const totalClicks = campaigns.reduce(
      (sum, c) => sum + c.analytics.clicks,
      0
    );

    const totalImpressions = campaigns.reduce(
      (sum, c) => sum + c.analytics.impressions,
      0
    );

    const totalRevenue = campaigns.reduce(
      (sum, c) => sum + c.budget.spent,
      0
    );

    // ================= RESPONSE =================

    res.json({
      users: {
        totalUsers,
        activeUsers,
        blockedUsers,
        advertisers,
        journalists,
        readers,
      },

      articles: {
        totalArticles,
        pendingArticles,
        publishedArticles,
        rejectedArticles,
      },

      campaigns: {
        totalCampaigns,
        activeCampaigns,
        pendingCampaigns,
        completedCampaigns,
        rejectedCampaigns,
      },

      revenue: {
        totalRevenue,
        totalClicks,
        totalImpressions,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMonthlyRevenue = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    const monthlyData = {};

    campaigns.forEach((c) => {
      const month = new Date(c.createdAt).toLocaleString("en-IN", {
        month: "short",
        year: "numeric",
      });

      monthlyData[month] =
        (monthlyData[month] || 0) + c.budget.spent;
    });

    const result = Object.keys(monthlyData).map((m) => ({
      month: m,
      revenue: monthlyData[m],
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .sort({ "analytics.clicks": -1 })
      .limit(5)
      .populate("advertiser", "companyName email");

    const result = campaigns.map((c) => ({
      id: c._id,
      title: c.title,
      advertiser: c.advertiser?.companyName,
      clicks: c.analytics.clicks,
      impressions: c.analytics.impressions,
      spent: c.budget.spent,
      status: c.status,
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLocationAnalytics = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    const locationData = {};

    campaigns.forEach((c) => {
      const key = `${c.target.city}, ${c.target.state}`;

      if (!locationData[key]) {
        locationData[key] = {
          clicks: 0,
          impressions: 0,
          revenue: 0,
        };
      }

      locationData[key].clicks += c.analytics.clicks;
      locationData[key].impressions += c.analytics.impressions;
      locationData[key].revenue += c.budget.spent;
    });

    const result = Object.keys(locationData).map((loc) => ({
      location: loc,
      ...locationData[loc],
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};