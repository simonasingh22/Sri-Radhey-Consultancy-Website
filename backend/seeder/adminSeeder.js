const readline = require('readline');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const question = (q) => new Promise((res) => rl.question(q, res));

const run = async () => {
  try {
    await connectDB();

    const email = await question('Admin email: ');
    const password = await question('Admin password: ');

    if (!email || !password) {
      console.error('Email and password are required');
      process.exit(1);
    }

    const exists = await Admin.findOne({ email: String(email).toLowerCase() });
    if (exists) {
      console.log('Admin already exists:', exists.email);
      process.exit(0);
    }

    const admin = new Admin({ name: 'Primary Admin', email: String(email).toLowerCase(), password });
    await admin.save();
    console.log('Admin created:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error('Seeder error:', err.message || err);
    process.exit(1);
  }
};

run();
