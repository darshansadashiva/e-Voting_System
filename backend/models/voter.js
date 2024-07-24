const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  voterId: String,
  mobileNumber: String,
  otp: String,
  token: String,
  voted: Boolean
});

module.exports = mongoose.model('Voter', VoterSchema);
