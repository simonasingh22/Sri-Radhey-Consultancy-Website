const Blog = require('../models/Blog');

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const { search, category, published } = req.query;
    const filter = {};

    if (category) filter.category = new RegExp(category, 'i');
    if (published === 'true') filter.published = true;
    if (published === 'false') filter.published = false;
    if (search) {
      const pattern = new RegExp(search, 'i');
      filter.$or = [
        { title: pattern },
        { slug: pattern },
        { excerpt: pattern },
        { category: pattern },
      ];
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      return next(new Error('Blog not found'));
    }
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
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
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBlogs,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
