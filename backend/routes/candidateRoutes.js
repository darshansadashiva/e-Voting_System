const express = require('express');
const router = express.Router();
const {
    getAllCandidates,
    addCandidate,
    getCandidateById,
    updateCandidateById,
    deleteCandidateById
} = require('../controllers/candidateController');

// Define routes
router.get('/', getAllCandidates);
router.post('/', addCandidate);
router.get('/:id', getCandidateById);
router.put('/:id', updateCandidateById);
router.delete('/:id', deleteCandidateById);

module.exports = router;
