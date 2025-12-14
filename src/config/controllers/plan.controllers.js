const Plan = require("../models/plan");

exports.createPlan = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;

    if (!title || !description || !price || !duration) {
      return res.status(400).json({ msg: "All fields required" });
    }

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
