const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLeadById,
  deleteLead,
  assignLead,
  addNote,
  addStatus,
  getLeadStats,
  getStatusDistribution,
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createLead);
router.get('/', protect, getLeads);
router.get('/stats', protect, getLeadStats);
router.get('/status-distribution', protect, getStatusDistribution);
router.get('/:id', protect, getLeadById);
router.delete('/:id', protect, deleteLead);
router.patch('/:id/assign', protect, assignLead);
router.post('/:id/notes', protect, addNote);
router.post('/:id/status', protect, addStatus);

module.exports = router;
