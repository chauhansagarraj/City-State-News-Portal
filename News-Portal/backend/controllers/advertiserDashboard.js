import Campaign from "../models/advertiser.model.js";
import User from "../models/user.model.js";

export const getAdvertiserDashboard = async (req, res) => {
  try {
    const advertiserId = req.user.id;

    const campaigns = await Campaign.find({ advertiser: advertiserId });

    const totalCampaigns = campaigns.length;

    const activeCampaigns = campaigns.filter(
      (c) => c.status === "active"
    ).length;

    const totalClicks = campaigns.reduce(
      (sum, c) => sum + (c.analytics?.clicks || 0),
      0
    );

    const totalImpressions = campaigns.reduce(
      (sum, c) => sum + (c.analytics?.impressions || 0),
      0
    );

    const totalSpent = campaigns.reduce(
      (sum, c) => sum + (c.analytics?.clicks || 0),
      0
    );

    const advertiser = await User.findById(advertiserId);

    res.json({
      totalCampaigns,
      activeCampaigns,
      totalClicks,
      totalImpressions,
      totalSpent,
      walletBalance: advertiser.wallet?.balance || 0,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAdvertiserCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      advertiser: req.user.id,
    }).sort({ createdAt: -1 });

    const formatted = campaigns.map((c) => ({
      id: c._id,
      title: c.title,
      placement: c.placement,
      status: c.status,
      budgetTotal: c.budget.total,
      spent: c.budget.spent,
      remaining: c.budget.total - c.budget.spent,
      clicks: c.analytics.clicks,
      impressions: c.analytics.impressions,
      startDate: c.schedule.startDate,
      endDate: c.schedule.endDate,
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      balance: user.wallet.balance,
      transactions: user.wallet.transactionHistory
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};