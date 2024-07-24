const Voter = require('../models/voter');
const otpService = require('../services/otpService');

exports.verifyVoter = async (req, res) => {
  const { name, dob, voterId } = req.body;
  try {
    console.log('Received voter details:', { name, dob, voterId }); // Log received data
    const voter = await Voter.findOne({ name, dob, voterId });
    if (!voter) {
      console.log('Voter not found'); // Log if voter not found
      return res.status(400).json({ message: 'Invalid voter details' });
    }

    const otp = otpService.generateOTP();
    otpService.storeOTP(voterId, otp);
    await otpService.sendOTP(voter, otp);

    res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('Error in verifyVoter:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { voterId, otp } = req.body;
  try {
    console.log('Received OTP verification request:', { voterId, otp }); // Log received data
    const result = otpService.verifyOTP(voterId, otp);
    if (!result.valid) {
      console.log('Invalid OTP or OTP expired'); // Log if OTP is invalid
      return res.status(400).json({ message: result.message });
    }

    res.json({ message: 'OTP verified', token: 'your_jwt_token' }); // Replace with actual token generation
  } catch (error) {
    console.error('Error in verifyOTP:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};
