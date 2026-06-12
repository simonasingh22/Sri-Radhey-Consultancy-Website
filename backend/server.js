const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const blogRoutes = require('./routes/blogRoutes');
const faqRoutes = require('./routes/faqRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const successStoryRoutes = require('./routes/successStoryRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(helmet());
app.disable('x-powered-by');
// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(morgan('dev'));

// Apply stricter limits for auth and leads endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
app.use('/api/auth/login', authLimiter);
const leadsLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
app.use('/api/leads', leadsLimiter);

const start = async () => {
  try {
    if (process.env.SKIP_DB === 'true') {
      console.log('SKIP_DB is true; skipping MongoDB connection (dev mode)');
    } else {
      await connectDB();
    }

    app.get('/api/health', (req, res) => {
      res.status(200).json({ status: 'success', message: 'Sri Radhey Consultancy Backend API is running', timestamp: new Date() });
    });

    app.use('/api/leads', leadRoutes);
    app.use('/api/blogs', blogRoutes);
    app.use('/api/faqs', faqRoutes);
    app.use('/api/testimonials', testimonialRoutes);
    app.use('/api/success-stories', successStoryRoutes);
    app.use('/api/policies', require('./routes/policyRoutes'));
    app.use('/api/settings', require('./routes/settingsRoutes'));
    app.use('/api/auth', authRoutes);

    // Serve frontend static if in production and frontend build exists
    if (process.env.NODE_ENV === 'production') {
      const frontendBuild = path.join(__dirname, '..', 'frontend', 'dist');
      app.use(express.static(frontendBuild));
      app.get('*', (req, res) => res.sendFile(path.join(frontendBuild, 'index.html')));
    }

    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));

    const graceful = async () => {
      console.log('Graceful shutdown initiated');
      server.close(() => console.log('HTTP server closed'));
      await require('mongoose').connection.close(false);
      console.log('MongoDB connection closed');
      process.exit(0);
    };

    process.on('SIGINT', graceful);
    process.on('SIGTERM', graceful);
  } catch (err) {
    console.error('Failed to start server:', err.message || err);
    process.exit(1);
  }
};

start();
