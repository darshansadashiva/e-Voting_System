const Candidate = require('../models/candidate'); // Adjust path if needed

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCandidate = async (req, res) => {
    const { name, party, yearOfService, educationBackground, age, constituency } = req.body;
    try {
        const candidate = new Candidate({ name, party, yearOfService, educationBackground, age, constituency });
        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCandidateById = async (req, res) => {
    const { id } = req.params;
    try {
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCandidateById = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const candidate = await Candidate.findByIdAndUpdate(id, updates, { new: true });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCandidateById = async (req, res) => {
    const { id } = req.params;
    try {
        const candidate = await Candidate.findByIdAndDelete(id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
