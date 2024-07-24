const jwt = require('jsonwebtoken');
const User = require('../models/voter.js'); // Adjust the path as needed

// Middleware to check for JWT token and authenticate user
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes "Bearer <token>"

  if (token == null) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    // Optionally, you can add user details to the request
    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
