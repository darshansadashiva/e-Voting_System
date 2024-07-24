const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController'); // Adjust path if needed

// Define routes
router.post('/login', loginAdmin);

module.exports = router;
