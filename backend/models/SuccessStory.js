const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema(
  {
    industry: { type: String, trim: true },
    location: { type: String, trim: true },
    policyUsed: { type: String, trim: true },
    problem: { type: String, trim: true },
    solution: { type: String, trim: true },
    outcome: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

SuccessStorySchema.index({ industry: 1 });
SuccessStorySchema.index({ location: 1 });
SuccessStorySchema.index({ createdAt: -1 });

module.exports = mongoose.models.SuccessStory || mongoose.model('SuccessStory', SuccessStorySchema);
