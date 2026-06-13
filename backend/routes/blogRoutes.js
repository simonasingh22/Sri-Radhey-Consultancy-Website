const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.get('/manage/all', protect, getAllBlogs);
router.get('/id/:id', protect, getBlogById);
router.get('/:slug', getBlogBySlug);

router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
