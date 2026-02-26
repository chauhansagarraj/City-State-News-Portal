import Campaign from "../models/advertiser.model.js";

export const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
      ...req.body,
      advertiser: req.user.id,
      status: "draft",
    });

    res.status(201).json({
      message: "Campaign created (draft)",
      campaign,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (campaign.status !== "active")
      return res.status(400).json({ message: "Campaign not active" });

    const userIP = req.ip;
    const now = new Date();
    const cooldown = 2 * 60 * 1000; // 2 minutes

    //  Check duplicate impression (same IP within cooldown)
    const recentImpression = campaign.analytics.lastImpressions.find(
      (imp) =>
        imp.ip === userIP &&
        now - new Date(imp.time) < cooldown
    );

    if (recentImpression) {
      return res.json({ message: "Duplicate impression ignored" });
    }

    const cost = campaign.budget.costPerImpression || 0;

    //  Check budget before charging
    if (campaign.budget.spent + cost > campaign.budget.total) {
      campaign.status = "completed";
      await campaign.save();

      return res.json({
        message: "Budget exhausted. Campaign completed.",
      });
    }

    //  Increase impression count
    campaign.analytics.impressions += 1;

    //  Add impression cost to spent
    campaign.budget.spent += cost;

    //  Save impression history
    campaign.analytics.lastImpressions.push({
      ip: userIP,
      time: now,
    });

    // Optional: keep array small (performance)
    if (campaign.analytics.lastImpressions.length > 200) {
      campaign.analytics.lastImpressions.shift();
    }

    await campaign.save();

    res.json({
      message: "Impression tracked successfully",
      impressions: campaign.analytics.impressions,
      spent: campaign.budget.spent,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const trackClick = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (campaign.status !== "active")
      return res.status(400).json({ message: "Campaign not active" });

    const userIP = req.ip;
    const now = new Date();
    const cooldown = 10 * 60 * 1000; // 10 minutes

    // 🔒 CHECK FOR DUPLICATE CLICK
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

    const cost = campaign.budget.costPerClick;

    // 💰 CHECK BUDGET
    if (campaign.budget.spent + cost > campaign.budget.total) {
      campaign.status = "completed";
      await campaign.save();

      return res.json({
        message: "Budget exhausted. Campaign completed.",
      });
    }

    // 📊 UPDATE ANALYTICS
    campaign.analytics.clicks += 1;
    campaign.budget.spent += cost;

    // 🧾 SAVE CLICK HISTORY
    campaign.analytics.lastClicks.push({
      ip: userIP,
      time: now,
    });

    // Optional: Keep only last 100 records (performance)
    if (campaign.analytics.lastClicks.length > 100) {
      campaign.analytics.lastClicks.shift();
    }

    await campaign.save();

    res.json({ message: "Click tracked successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};