const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    excerpt: { type: String, trim: true },
    content: { type: String },
    category: { type: String, trim: true, index: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    keywords: [{ type: String }],
    featuredImage: { type: String, trim: true },
    published: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

BlogSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
