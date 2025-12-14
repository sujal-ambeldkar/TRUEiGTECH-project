const Plan = require('../models/plan');

exports.getTrainerPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ trainer: req.user.id });
    res.json(plans);
  } catch(err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createPlan = async (req, res) => {
  const { title, description, price, duration } = req.body;
  try {
    const plan = new Plan({
      title,
      description,
      price,
      duration,
      trainer: req.user.id
    });
    await plan.save();
    res.status(201).json({ msg: 'Plan created', plan });
  } catch(err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
