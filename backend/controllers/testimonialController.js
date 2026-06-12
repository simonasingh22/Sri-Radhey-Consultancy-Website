const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res, next) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.admin && req.admin._id) data.createdBy = req.admin._id;
    const item = await Testimonial.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) {
      res.status(404);
      return next(new Error('Testimonial not found'));
    }
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) {
      res.status(404);
      return next(new Error('Testimonial not found'));
    }
    await item.remove();
    res.json({ message: 'Testimonial removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
