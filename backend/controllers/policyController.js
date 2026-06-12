const Policy = require('../models/Policy');

const getPolicies = async (req, res, next) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (err) {
    next(err);
  }
};

const getPolicyBySlug = async (req, res, next) => {
  try {
    const policy = await Policy.findOne({ slug: req.params.slug });
    if (!policy) {
      res.status(404);
      return next(new Error('Policy not found'));
    }
    res.json(policy);
  } catch (err) {
    next(err);
  }
};

const createPolicy = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.admin && req.admin._id) data.createdBy = req.admin._id;
    const policy = await Policy.create(data);
    res.status(201).json(policy);
  } catch (err) {
    next(err);
  }
};

const updatePolicy = async (req, res, next) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      res.status(404);
      return next(new Error('Policy not found'));
    }
    Object.assign(policy, req.body);
    await policy.save();
    res.json(policy);
  } catch (err) {
    next(err);
  }
};

const deletePolicy = async (req, res, next) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      res.status(404);
      return next(new Error('Policy not found'));
    }
    await policy.remove();
    res.json({ message: 'Policy removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPolicies, getPolicyBySlug, createPolicy, updatePolicy, deletePolicy };
