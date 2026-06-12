const FAQ = require('../models/FAQ');

const getFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    next(err);
  }
};

const createFAQ = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.admin && req.admin._id) data.createdBy = req.admin._id;
    const faq = await FAQ.create(data);
    res.status(201).json(faq);
  } catch (err) {
    next(err);
  }
};

const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      res.status(404);
      return next(new Error('FAQ not found'));
    }
    Object.assign(faq, req.body);
    await faq.save();
    res.json(faq);
  } catch (err) {
    next(err);
  }
};

const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      res.status(404);
      return next(new Error('FAQ not found'));
    }
    await faq.remove();
    res.json({ message: 'FAQ removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getFAQs, createFAQ, updateFAQ, deleteFAQ };
