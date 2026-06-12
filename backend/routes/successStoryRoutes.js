const express = require('express');
const router = express.Router();
const { getSuccessStories, createSuccessStory, updateSuccessStory, deleteSuccessStory } = require('../controllers/successStoryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSuccessStories);

router.post('/', protect, createSuccessStory);
router.put('/:id', protect, updateSuccessStory);
router.delete('/:id', protect, deleteSuccessStory);

module.exports = router;
