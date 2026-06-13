const express = require('express');
const router = express.Router();
const { login, getAdmins } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/admins', protect, getAdmins);

module.exports = router;
