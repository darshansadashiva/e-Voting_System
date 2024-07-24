const Voter = require('../models/voter');

exports.verifyVoter = async (req, res) => {
  const { name, dob, voterId } = req.body;
  try {
    console.log('Received verifyVoter request:', { name, dob, voterId });

    const voter = await Voter.findOne({ name, dob, voterId });
    if (!voter) {
      console.log('Voter not found or invalid details:', { name, dob, voterId });
      return res.status(400).json({ message: 'Invalid voter details' });
    }

    console.log('Voter found:', voter);
    res.json({ message: 'Voter verified' });
  } catch (error) {
    console.error('Error in verifyVoter:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
