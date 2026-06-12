const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    designation: { type: String, trim: true },
    review: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
