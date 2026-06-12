const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, trim: true },
    email: { type: String, required: true, trim: true, index: true },
    district: { type: String, required: true, trim: true, index: true },
    serviceRequired: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: [
        'New',
        'Contacted',
        'Documents Pending',
        'Applied',
        'In Process',
        'Subsidy Received',
      ],
      default: 'New',
      index: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    notes: [
      {
        text: { type: String, trim: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    statusHistory: [
      {
        status: { type: String, trim: true },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

LeadSchema.index({ phone: 1 });
LeadSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
