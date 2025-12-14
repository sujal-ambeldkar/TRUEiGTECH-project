const express = require('express');
const router = express.Router();
const { createPlan, getTrainerPlans } = require('../controllers/trainer.controllers');
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware); // protect routes

router.get('/plans', getTrainerPlans);
router.post('/plans', createPlan);

module.exports = router;
