const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const voterController = require('../controllers/voterController');

// Public route to verify voter credentials
router.post('/verify', voterController.verifyVoter);

// Apply authentication middleware to protected routes
router.use(authenticateToken);

// Protected route to verify OTP
router.post('/verify-otp', voterController.verifyOTP);

module.exports = router;
