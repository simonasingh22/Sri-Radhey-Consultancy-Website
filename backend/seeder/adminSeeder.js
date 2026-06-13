// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config({ path: path.join(__dirname, '..', '.env') });

// const connectDB = require('../config/db');
// const Admin = require('../models/Admin');

// const FIXED_ADMIN = {
//   name: 'Primary Admin',
//   email: 'admin@sriradheyconsultancy.com',
//   password: 'SRC_Admin@2025',
// };

// const run = async () => {
//   try {
//     await connectDB();

//     const existingAdmin = await Admin.findOne({
//       email: FIXED_ADMIN.email.toLowerCase(),
//     });

//     if (existingAdmin) {
//       existingAdmin.name = FIXED_ADMIN.name;
//       existingAdmin.password = FIXED_ADMIN.password;
//       await existingAdmin.save();

//       console.log('Fixed admin updated successfully:', FIXED_ADMIN.email);
//       process.exit(0);
//     }

//     const admin = new Admin({
//       name: FIXED_ADMIN.name,
//       email: FIXED_ADMIN.email.toLowerCase(),
//       password: FIXED_ADMIN.password,
//     });

//     await admin.save();

//     console.log('Fixed admin created successfully:', FIXED_ADMIN.email);
//     process.exit(0);
//   } catch (err) {
//     console.error('Seeder error:', err.message || err);
//     process.exit(1);
//   }
// };

// run();