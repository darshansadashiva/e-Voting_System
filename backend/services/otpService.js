const crypto = require('crypto');
const Voter = require('../models/voter'); // Adjust the path as necessary

let Vonage;

const loadVonage = async () => {
  if (!Vonage) {
    Vonage = (await import('@vonage/server-sdk')).Vonage;
  }
  return Vonage;
};

const sendOTP = async (voter, otp) => {
  const vonage = await loadVonage();
  const vonageClient = new vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
  });

  const from = 'Vonage APIs';
  const to = voter.mobileNumber;
  const text = `Your OTP for voting is ${otp}`;

  try {
    console.log('Sending OTP via Vonage:', { to, from, text });
    const response = await vonageClient.message.sendSms(from, to, text);
    console.log('OTP sent successfully:', response);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

// In-memory storage for OTPs (for demonstration purposes, use a database in production)
const otpStorage = {};

// Generate a 6-digit OTP
const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log('Generated OTP:', otp);
  return otp;
};

// Store OTP in memory (for demonstration purposes, use a database in production)
const storeOTP = (voterId, otp) => {
  otpStorage[voterId] = { otp, timestamp: Date.now() };
  console.log('Stored OTP for voterId:', voterId);
};

// Verify OTP
const verifyOTP = (voterId, otp) => {
  const record = otpStorage[voterId];
  if (!record) {
    console.log('No OTP record found for voterId:', voterId);
    return { valid: false, message: 'OTP not found' };
  }

  const { otp: storedOTP, timestamp } = record;
  const currentTime = Date.now();

  // Check if OTP is valid (e.g., valid for 5 minutes)
  if (currentTime - timestamp > 5 * 60 * 1000) { // 5 minutes in milliseconds
    console.log('OTP expired for voterId:', voterId);
    return { valid: false, message: 'OTP expired' };
  }

  if (storedOTP !== otp) {
    console.log('Invalid OTP for voterId:', voterId);
    return { valid: false, message: 'Invalid OTP' };
  }

  // OTP is valid
  delete otpStorage[voterId]; // Remove OTP after verification
  console.log('OTP verified successfully for voterId:', voterId);
  return { valid: true };
};

module.exports = {
  generateOTP,
  sendOTP,
  storeOTP,
  verifyOTP
};
