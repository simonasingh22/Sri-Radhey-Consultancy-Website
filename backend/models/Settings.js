const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, trim: true },
    tagline: { type: String, trim: true },
    phone: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true },
    logo: { type: String, trim: true },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      instagram: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
