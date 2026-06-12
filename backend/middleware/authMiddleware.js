const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, token missing'));
  }

  try {
    if (!process.env.JWT_SECRET) {
      res.status(500);
      return next(new Error('JWT_SECRET is not configured'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      res.status(401);
      return next(new Error('Not authorized, admin not found'));
    }
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401);
    next(new Error('Not authorized, token failed'));
  }
};

module.exports = { protect };
