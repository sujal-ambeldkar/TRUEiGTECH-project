const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware.js");
const isTrainer = require("../middleware/isTrainer");
const { createPlan } = require("../controllers/plan.controllers");

router.post("/create", auth, isTrainer, createPlan);

module.exports = router;
