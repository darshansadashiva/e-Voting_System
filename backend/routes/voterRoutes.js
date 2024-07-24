const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');

// Public route to verify voter credentials
router.post('/verify', voterController.verifyVoter);

module.exports = router;
