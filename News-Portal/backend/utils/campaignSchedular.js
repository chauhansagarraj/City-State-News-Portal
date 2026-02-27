import cron from "node-cron";
import Campaign from "../models/advertiser.model.js";

// Runs every minute
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    //  Activate campaigns
    await Campaign.updateMany(
      {
        status: "approved",
        "schedule.startDate": { $lte: now },
        "schedule.endDate": { $gt: now },
      },
      { $set: { status: "active" } }
    );

    //  Complete campaigns
    await Campaign.updateMany(
      {
        status: { $in: ["active", "approved"] },
        "schedule.endDate": { $lte: now },
      },
      { $set: { status: "completed" } }
    );

    console.log("Campaign scheduler ran at:", now);

  } catch (err) {
    console.error("Scheduler error:", err);
  }
});