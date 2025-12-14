const Plan = require("../models/plan");

// ✅ GET ALL PLANS (for users)
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().populate("trainer", "name");
    res.json(plans);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ GET TRAINER PLANS
exports.getTrainerPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ trainer: req.user.id });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ CREATE PLAN
exports.createPlan = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;

    const plan = new Plan({
      title,
      description,
      price,
      duration,
      trainer: req.user.id
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
