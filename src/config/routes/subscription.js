const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { subscribePlan } = require("../controllers/subscription.controllers");

router.post("/subscribe/:planId", auth, subscribePlan);

module.exports = router;
