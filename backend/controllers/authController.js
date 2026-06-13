const jwt = require('jsonwebtoken');

const FIXED_ADMIN = {
  id: 'primary-admin',
  name: 'Primary Admin',
  email: 'admin@sriradheyconsultancy.com',
  password: 'SRC_Admin@2025',
};

const generateToken = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing');
  }

  return jwt.sign(
    {
      id: FIXED_ADMIN.id,
      email: FIXED_ADMIN.email,
      role: 'admin',
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      return next(new Error('Email and password are required'));
    }

    const enteredEmail = String(email).trim().toLowerCase();

    if (
      enteredEmail !== FIXED_ADMIN.email.toLowerCase() ||
      password !== FIXED_ADMIN.password
    ) {
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    res.json({
      token: generateToken(),
      admin: {
        id: FIXED_ADMIN.id,
        name: FIXED_ADMIN.name,
        email: FIXED_ADMIN.email,
        role: 'admin',
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/admins
const getAdmins = async (req, res, next) => {
  try {
    res.json([
      {
        id: FIXED_ADMIN.id,
        name: FIXED_ADMIN.name,
        email: FIXED_ADMIN.email,
        role: 'admin',
      },
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, getAdmins };