import Campaign from "../models/advertiser.model.js";
import User from "../models/user.model.js";

export const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
      ...req.body,
      schedule: {
        startDate: new Date(req.body.schedule.startDate),
        endDate: new Date(req.body.schedule.endDate),
      },
      advertiser: req.user.id,
      status: "draft",
    });

    res.status(201).json({
      message: "Campaign created (draft)",
      campaign,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({
    advertiser: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(campaigns);
};

export const getCampaignById = async (req, res) => {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    advertiser: req.user.id,
  });

  if (!campaign)
    return res.status(404).json({ message: "Campaign not found" });

  res.json(campaign);
};

export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate(
      {
        _id: req.params.id,
        advertiser: req.user.id,
        status: { $in: ["draft", "rejected"] }
      },
      { $set: req.body },
      { new: true }
    );

    if (!campaign)
      return res.status(404).json({
        message: "Campaign not found or not editable",
      });

    res.json({
      message: "Campaign updated successfully",
      campaign,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCampaign = async (req, res) => {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    advertiser: req.user.id,
  });

  if (!campaign)
    return res.status(404).json({ message: "Campaign not found" });

  if (campaign.status === "active") {
    return res.status(400).json({
      message: "Cannot delete active campaign",
    });
  }

  await campaign.deleteOne();

  res.json({ message: "Campaign deleted" });
};

export const submitCampaign = async (req, res) => {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    advertiser: req.user.id,
  });

  if (!campaign)
    return res.status(404).json({ message: "Campaign not found" });

  if (campaign.status !== "draft") {
    return res.status(400).json({
      message: "Only draft campaigns can be submitted",
    });
  }

  campaign.status = "pending";
  await campaign.save();

  res.json({ message: "Submitted for admin approval" });
};

export const pauseCampaign = async (req, res) => {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    advertiser: req.user.id,
  });

  if (!campaign)
    return res.status(404).json({ message: "Campaign not found" });

  campaign.status = "paused";
  await campaign.save();

  res.json({ message: "Campaign paused" });
};

export const resumeCampaign = async (req, res) => {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    advertiser: req.user.id,
  });

  if (!campaign)
    return res.status(404).json({ message: "Campaign not found" });

  campaign.status = "active";
  await campaign.save();

  res.json({ message: "Campaign resumed" });
};


export const trackImpression = async (req, res) => {
  try {
    const campaign = await Campaign
      .findById(req.params.id)
      .populate("advertiser");   // ⭐ REQUIRED

    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (campaign.status !== "active")
      return res.status(400).json({ message: "Campaign not active" });

    const advertiser = campaign.advertiser;
    const userIP = req.ip;
    const now = new Date();
    const cooldown = 2 * 60 * 1000; // 2 minutes

    // 🔒 Duplicate prevention
    const recentImpression = campaign.analytics.lastImpressions.find(
      (imp) =>
        imp.ip === userIP &&
        now - new Date(imp.time) < cooldown
    );

    if (recentImpression) {
      return res.json({ message: "Duplicate impression ignored" });
    }

    const cost = campaign.budget.costPerImpression;

    //  Check wallet balance
    if (advertiser.wallet.balance < cost) {
      campaign.status = "paused";
      await campaign.save();

      return res.status(400).json({
        message: "Campaign paused due to insufficient wallet balance",
      });
    }

    //  Check campaign budget limit
    if (campaign.budget.spent + cost > campaign.budget.total) {
      campaign.status = "completed";
      await campaign.save();

      return res.json({
        message: "Budget exhausted. Campaign completed.",
      });
    }

    //  Deduct from wallet
    advertiser.wallet.balance -= cost;

    advertiser.wallet.transactionHistory.push({
      type: "spent",
      amount: cost,
      campaign: campaign._id,
      description: "Impression charge",
    });

    //  Update campaign
    campaign.analytics.impressions += 1;
    campaign.budget.spent += cost;

    if (campaign.budget.spent >= campaign.budget.total) {
  campaign.status = "completed";
}

    //  Save history
    campaign.analytics.lastImpressions.push({
      ip: userIP,
      time: now,
    });

    if (campaign.analytics.lastImpressions.length > 200) {
      campaign.analytics.lastImpressions.shift();
    }

    await advertiser.save();
    await campaign.save();

    res.json({
      message: "Impression tracked successfully",
      impressions: campaign.analytics.impressions,
      spent: campaign.budget.spent,
      walletBalance: advertiser.wallet.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const trackClick = async (req, res) => {
  try {
    const campaign = await Campaign
      .findById(req.params.id)
      .populate("advertiser");

    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (campaign.status !== "active")
      return res.status(400).json({ message: "Campaign not active" });

    const advertiser = campaign.advertiser;
    const cost = campaign.budget.costPerClick;

    const userIP = req.ip;
    const now = new Date();
    const cooldown = 2 * 60 * 1000;

    //  Duplicate prevention
    const recentClick = campaign.analytics.lastClicks.find(
      (click) =>
        click.ip === userIP &&
        now - new Date(click.time) < cooldown
    );

    if (recentClick) {
      return res.json({
        message: "Duplicate click ignored",
      });
    }

    //  Wallet check
    if (advertiser.wallet.balance < cost) {
      campaign.status = "paused";
      await campaign.save();

      return res.status(400).json({
        message: "Campaign paused — low wallet balance",
      });
    }

    //  Budget check  
    if (campaign.budget.spent + cost > campaign.budget.total) {
      campaign.status = "completed";
      await campaign.save();

      return res.json({
        message: "Budget exhausted. Campaign completed.",
      });
    }

    //  Deduct wallet
    advertiser.wallet.balance -= cost;

    advertiser.wallet.transactionHistory.push({
      type: "spent",
      amount: cost,
      campaign: campaign._id,
      description: "Click charge",
    });

    //  Update campaign
    campaign.analytics.clicks += 1;
    campaign.budget.spent += cost;

    //  Save click history
    campaign.analytics.lastClicks.push({
      ip: userIP,
      time: now,
    });

    if (campaign.analytics.lastClicks.length > 200) {
      campaign.analytics.lastClicks.shift();
    }

    //  Auto-complete if budget reached
    if (campaign.budget.spent >= campaign.budget.total) {
      campaign.status = "completed";
    }

    await advertiser.save();
    await campaign.save();

    res.json({
      message: "Click tracked successfully",
      spent: campaign.budget.spent,
      walletBalance: advertiser.wallet.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addFunds = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const user = await User.findById(req.user._id);

    user.wallet.balance += amount;

    user.wallet.transactionHistory.push({
      type: "add",
      amount,
      description: "Wallet recharge",
    });

    await user.save();

    res.json({
      message: "Funds added successfully",
      balance: user.wallet.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};