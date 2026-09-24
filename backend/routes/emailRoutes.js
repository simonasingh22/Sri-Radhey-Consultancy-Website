const express = require('express');
const rateLimit = require('express-rate-limit');
const { contact, eligibility } = require('../controllers/emailController');

const router = express.Router();
const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });

router.post('/contact', formLimiter, contact);
router.post('/eligibility', formLimiter, eligibility);

module.exports = router;
