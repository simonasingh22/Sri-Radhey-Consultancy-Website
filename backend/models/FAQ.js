const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema(
  {
    category: { type: String, trim: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
