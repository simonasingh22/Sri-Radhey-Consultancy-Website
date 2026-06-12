const express = require('express');
const router = express.Router();
const { getPolicies, getPolicyBySlug, createPolicy, updatePolicy, deletePolicy } = require('../controllers/policyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPolicies);
router.get('/:slug', getPolicyBySlug);

router.post('/', protect, createPolicy);
router.put('/:id', protect, updatePolicy);
router.delete('/:id', protect, deletePolicy);

module.exports = router;
