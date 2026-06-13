const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not configured in environment');
  }

  try {
    // recommended mongoose options
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri, {
      maxPoolSize: Number(process.env.MONGO_URL) || 10,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;
