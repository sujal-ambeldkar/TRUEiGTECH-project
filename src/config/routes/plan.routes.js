const express = require("express");
const router = express.Router();
const { getAllPlans, getTrainerPlans, createPlan } = require("../controllers/plan.controllers");
const auth = require("../middleware/auth.middleware.js");
const isTrainer = require("../middleware/isTrainer");

// All plans (for users)
router.get("/all", getAllPlans);

// Trainer routes
router.get("/trainer", auth, isTrainer, getTrainerPlans);
router.post("/trainer/create", auth, isTrainer, createPlan);

module.exports = router;
