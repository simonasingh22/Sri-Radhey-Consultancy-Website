const jwt = require('jsonwebtoken');

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

    if (
      decoded.email !== 'admin@sriradheyconsultancy.com' ||
      decoded.role !== 'admin'
    ) {
      res.status(401);
      return next(new Error('Not authorized'));
    }

    req.admin = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    res.status(401);
    next(new Error('Not authorized, token failed'));
  }
};

module.exports = { protect };