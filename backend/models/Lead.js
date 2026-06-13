const mongoose = require('mongoose');

const LEAD_STATUSES = [
  'New Lead',
  'Contacted',
  'Meeting Scheduled',
  'WhatsApp Group Created',
  'Documents Pending',
  'Documents Received',
  'Application Filed',
  'Under Review',
  'DIC Follow-Up',
  'Approved',
  'Subsidy Received',
  'Rejected',
];

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    companyName: { type: String, trim: true },
    industry: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, trim: true },
    email: { type: String, required: true, trim: true, index: true },
    district: { type: String, required: true, trim: true, index: true },
    serviceRequired: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: 'New Lead',
      index: true,
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', index: true },
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
        status: { type: String, enum: LEAD_STATUSES },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

LeadSchema.index({ phone: 1 });
LeadSchema.index({ createdAt: -1 });

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

module.exports = Lead;
module.exports.LEAD_STATUSES = LEAD_STATUSES;
