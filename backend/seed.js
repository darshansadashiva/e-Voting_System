const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Voter = require('./models/voter');
const Admin = require('./models/admin');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

const seedVoters = [
  {
    name: 'John Doe',
    dob: new Date('1990-01-01'), // Convert to Date object
    voterId: 'VOTER123',
    mobileNumber: '919113500420' // Ensure this number is correct
  },
  {
    name: 'Jane Smith',
    dob: new Date('1985-05-15'), // Convert to Date object
    voterId: 'VOTER124',
    mobileNumber: '919113500420' // Ensure this number is correct
  }
];

const seedAdmins = [
  {
    name: 'Admin One',
    email: 'admin1@example.com',
    password: 'password123'
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Voter.deleteMany({});
    await Admin.deleteMany({});

    // Insert new data
    await Voter.insertMany(seedVoters);
    console.log('Voters seeded successfully');

    await Admin.insertMany(seedAdmins);
    console.log('Admin seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
