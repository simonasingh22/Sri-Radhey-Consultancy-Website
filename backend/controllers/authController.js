const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      return next(new Error('email and password required'));
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    res.json({ token: generateToken(admin._id), admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
