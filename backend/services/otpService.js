const crypto = require('crypto');
const Voter = require('../models/voter');

// In-memory storage for OTPs
const otpStorage = {};

// Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP via SMS using Vonage
const sendOTP = async (voter, otp) => {
  const { Vonage } = await import('@vonage/server-sdk');

  const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
  });

  const from = process.env.VONAGE_PHONE_NUMBER;
  const to = voter.mobileNumber;
  const text = `Your OTP for voting is ${otp}`;

  try {
    await vonage.message.sendSms(from, to, text);
    console.log(`OTP sent to ${voter.mobileNumber}`);
  } catch (error) {
    console.error(`Error sending OTP: ${error}`);
  }
};

// Store OTP in memory (for demonstration purposes)
const storeOTP = (voterId, otp) => {
  otpStorage[voterId] = { otp, timestamp: Date.now() };
};

// Verify OTP
const verifyOTP = (voterId, otp) => {
  const record = otpStorage[voterId];
  if (!record) {
    return { valid: false, message: 'OTP not found' };
  }

  const { otp: storedOTP, timestamp } = record;
  const currentTime = Date.now();

  if (currentTime - timestamp > 5 * 60 * 1000) { // 5 minutes in milliseconds
    return { valid: false, message: 'OTP expired' };
  }

  if (storedOTP !== otp) {
    return { valid: false, message: 'Invalid OTP' };
  }

  delete otpStorage[voterId]; // Remove OTP after verification
  return { valid: true };
};

module.exports = {
  generateOTP,
  sendOTP,
  storeOTP,
  verifyOTP
};
