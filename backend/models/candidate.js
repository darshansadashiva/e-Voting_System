const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  },
  yearOfService: {
    type: Number,
    required: true
  },
  educationBackground: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  constituency: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
