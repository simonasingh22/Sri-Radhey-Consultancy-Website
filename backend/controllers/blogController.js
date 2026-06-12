const Blog = require('../models/Blog');

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      res.status(404);
      return next(new Error('Blog not found'));
    }
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.admin && req.admin._id) data.createdBy = req.admin._id;
    const blog = await Blog.create(data);
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      return next(new Error('Blog not found'));
    }
    Object.assign(blog, req.body);
    await blog.save();
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      return next(new Error('Blog not found'));
    }
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
