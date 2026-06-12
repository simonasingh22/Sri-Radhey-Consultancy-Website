const SuccessStory = require('../models/SuccessStory');

const getSuccessStories = async (req, res, next) => {
  try {
    const items = await SuccessStory.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const createSuccessStory = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.admin && req.admin._id) data.createdBy = req.admin._id;
    const item = await SuccessStory.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const updateSuccessStory = async (req, res, next) => {
  try {
    const item = await SuccessStory.findById(req.params.id);
    if (!item) {
      res.status(404);
      return next(new Error('Success story not found'));
    }
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const deleteSuccessStory = async (req, res, next) => {
  try {
    const item = await SuccessStory.findById(req.params.id);
    if (!item) {
      res.status(404);
      return next(new Error('Success story not found'));
    }
    await item.remove();
    res.json({ message: 'Success story removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSuccessStories, createSuccessStory, updateSuccessStory, deleteSuccessStory };
