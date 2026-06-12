const express = require('express');
const router = express.Router();
const { createLead, getLeads, getLeadById, deleteLead, addNote, addStatus } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createLead);
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.delete('/:id', protect, deleteLead);
router.post('/:id/notes', protect, addNote);
router.post('/:id/status', protect, addStatus);

module.exports = router;
