const Subscription = require("../models/subscription");
const Plan = require("../models/plan");

exports.subscribePlan = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ msg: "Only users can subscribe" });
    }

    const planId = req.params.planId;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    const alreadySubscribed = await Subscription.findOne({
      user: req.user.id,
      plan: planId
    });

    if (alreadySubscribed) {
      return res.status(400).json({ msg: "Already subscribed" });
    }

    const subscription = new Subscription({
      user: req.user.id,
      plan: planId
    });

    await subscription.save();
    res.status(201).json({ msg: "Subscription successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
