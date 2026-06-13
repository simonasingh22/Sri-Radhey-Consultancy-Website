const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error('MONGO_URL is not configured in environment');
  }

  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri, {
      maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE) || 10,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;
