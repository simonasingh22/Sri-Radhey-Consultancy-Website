const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    overview: { type: String, trim: true },
    benefits: { type: String, trim: true },
    eligibility: { type: String, trim: true },
    requiredDocuments: [{ type: String }],
    applicationProcess: { type: String, trim: true },
    timeline: { type: String, trim: true },
    faqs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FAQ' }],
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

PolicySchema.index({ createdAt: -1 });

module.exports = mongoose.models.Policy || mongoose.model('Policy', PolicySchema);
