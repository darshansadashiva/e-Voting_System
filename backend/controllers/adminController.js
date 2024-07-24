const Admin = require('../models/admin'); // Adjust path if needed

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Fetch the admin by email
        const admin = await Admin.findOne({ email });

        // Check if the admin exists
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare the provided password with the stored password
        if (admin.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Respond with a success message if login is successful
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        // Handle any server errors
        res.status(500).json({ message: error.message });
    }
};
