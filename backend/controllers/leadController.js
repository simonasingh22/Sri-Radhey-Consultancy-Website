const Lead = require('../models/Lead');
const { LEAD_STATUSES } = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');
const validator = require('validator');

const TERMINAL_STATUSES = ['Approved', 'Subsidy Received', 'Rejected'];

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

// POST /api/leads
const createLead = async (req, res, next) => {
  try {
    const {
      name,
      company,
      companyName,
      industry,
      phone,
      email,
      district,
      serviceRequired,
      message,
      whatsappNumber,
    } = req.body;

    if (!name || !phone || !email || !district || !serviceRequired) {
      res.status(400);
      return next(
        new Error('Name, phone, email, district and service are required')
      );
    }

    const cleanName = validator.escape(String(name).trim());
    const cleanCompany = company ? validator.escape(String(company).trim()) : '';
    const cleanCompanyName = companyName
      ? validator.escape(String(companyName).trim())
      : cleanCompany;
    const cleanIndustry = industry ? validator.escape(String(industry).trim()) : '';
    const cleanMessage = message ? validator.escape(String(message).trim()) : '';
    const cleanDistrict = district ? validator.escape(String(district).trim()) : '';
    const cleanService = serviceRequired
      ? validator.escape(String(serviceRequired).trim())
      : '';

    const normalizedEmail = validator.normalizeEmail(String(email).trim());

    if (!validator.isEmail(String(email).trim())) {
      res.status(400);
      return next(new Error('Invalid email format'));
    }

    const digits = String(phone).replace(/\D/g, '');

    if (digits.length < 10) {
      res.status(400);
      return next(new Error('Invalid phone number'));
    }

    const lead = await Lead.create({
      name: cleanName,
      company: cleanCompany,
      companyName: cleanCompanyName,
      industry: cleanIndustry,
      phone: String(phone).trim(),
      email: normalizedEmail,
      district: cleanDistrict,
      whatsappNumber: whatsappNumber || '',
      serviceRequired: cleanService,
      message: cleanMessage,
      statusHistory: [{ status: 'New Lead' }],
    });

    try {
      const to =
        process.env.EMAIL_TO ||
        process.env.COMPANY_EMAIL ||
        'sriradheyconsultancy@gmail.com';

      const subject = `New Website Inquiry - ${lead.serviceRequired}`;

      const text = `
New enquiry received from Sri Radhey Consultancy website.

Name: ${lead.name}
Company: ${lead.company || lead.companyName || 'Not provided'}
Industry: ${lead.industry || 'Not provided'}
Phone: ${lead.phone}
WhatsApp: ${lead.whatsappNumber || 'Not provided'}
Email: ${lead.email}
District: ${lead.district}
Service Required: ${lead.serviceRequired}

Message:
${lead.message || 'No message provided'}
      `;

      const html = `
        <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:24px;">
          <div style="max-width:640px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
            
            <div style="background:#0f2f5f; color:#ffffff; padding:18px 24px;">
              <h2 style="margin:0; font-size:20px;">New Website Inquiry</h2>
              <p style="margin:6px 0 0; color:#d6b04a;">Sri Radhey Consultancy</p>
            </div>

            <div style="padding:24px;">
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Name</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(lead.name)}</td>
                </tr>

                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Company</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(
                    lead.company || lead.companyName || 'Not provided'
                  )}</td>
                </tr>

                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Industry</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(
                    lead.industry || 'Not provided'
                  )}</td>
                </tr>

                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Phone</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(lead.phone)}</td>
                </tr>

                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>WhatsApp</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(
                    lead.whatsappNumber || 'Not provided'
                  )}</td>
                </tr>

                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Email</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(lead.email)}</td>
                </tr>

                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>District</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(lead.district)}</td>
                </tr>

                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Service Required</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${escapeHtml(lead.serviceRequired)}</td>
                </tr>

                <tr>
                  <td style="padding:10px; vertical-align:top;"><strong>Message</strong></td>
                  <td style="padding:10px;">${escapeHtml(
                    lead.message || 'No message provided'
                  )}</td>
                </tr>
              </table>

              <p style="margin-top:20px; font-size:12px; color:#6b7280;">
                This inquiry was submitted through the official Sri Radhey Consultancy website contact form.
              </p>
            </div>
          </div>
        </div>
      `;

      sendEmail({
  to,
  subject,
  text,
  html,
}).catch((emailErr) => {
  console.error('Error sending lead email:', emailErr.message || emailErr);
});
    } catch (emailErr) {
      console.error('Error sending lead email:', emailErr.message || emailErr);
    }

    res.status(201).json({
      message: 'Inquiry submitted successfully',
      lead,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/leads
const getLeads = async (req, res, next) => {
  try {
    const {
      status,
      district,
      serviceRequired,
      assignedTo,
      search,
      page = '1',
      limit = '20',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (district) filter.district = new RegExp(`^${district}$`, 'i');
    if (serviceRequired) filter.serviceRequired = new RegExp(serviceRequired, 'i');
    if (assignedTo) filter.assignedTo = assignedTo;

    if (search) {
      const pattern = new RegExp(search, 'i');
      filter.$or = [
        { name: pattern },
        { email: pattern },
        { phone: pattern },
        { company: pattern },
        { companyName: pattern },
        { district: pattern },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const allowedSortFields = [
      'createdAt',
      'name',
      'status',
      'district',
      'serviceRequired',
    ];

    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDir = sortOrder === 'asc' ? 1 : -1;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('assignedTo', 'name email')
        .sort({ [sortField]: sortDir })
        .skip(skip)
        .limit(limitNum),
      Lead.countDocuments(filter),
    ]);

    res.json({
      leads,
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum) || 1,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/leads/:id
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email')
      .populate('statusHistory.updatedBy', 'name email');

    if (!lead) {
      res.status(404);
      return next(new Error('Lead not found'));
    }

    res.json(lead);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/leads/:id
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404);
      return next(new Error('Lead not found'));
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.json({ message: 'Lead removed' });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/leads/:id/assign
const assignLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404);
      return next(new Error('Lead not found'));
    }

    const { assignedTo } = req.body;

    lead.assignedTo = assignedTo || null;

    await lead.save();

    const populated = await Lead.findById(lead._id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email')
      .populate('statusHistory.updatedBy', 'name email');

    res.json(populated);
  } catch (err) {
    next(err);
  }
};

// POST /api/leads/:id/notes
const addNote = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404);
      return next(new Error('Lead not found'));
    }

    const { text } = req.body;

    const note = {
      text,
      addedBy: req.admin ? req.admin._id : null,
    };

    lead.notes.push(note);

    await lead.save();

    const populated = await Lead.findById(lead._id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email')
      .populate('statusHistory.updatedBy', 'name email');

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// POST /api/leads/:id/status
const addStatus = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404);
      return next(new Error('Lead not found'));
    }

    const { status } = req.body;

    if (!status || !LEAD_STATUSES.includes(status)) {
      res.status(400);
      return next(
        new Error(`Invalid status. Must be one of: ${LEAD_STATUSES.join(', ')}`)
      );
    }

    const entry = {
      status,
      updatedBy: req.admin ? req.admin._id : null,
    };

    lead.status = status;
    lead.statusHistory.push(entry);

    await lead.save();

    const populated = await Lead.findById(lead._id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email')
      .populate('statusHistory.updatedBy', 'name email');

    res.json(populated);
  } catch (err) {
    next(err);
  }
};

// GET /api/leads/stats
const getLeadStats = async (req, res, next) => {
  try {
    const [totalLeads, newLeads, approved, subsidyReceived, inProcess] =
      await Promise.all([
        Lead.countDocuments(),
        Lead.countDocuments({ status: 'New Lead' }),
        Lead.countDocuments({ status: 'Approved' }),
        Lead.countDocuments({ status: 'Subsidy Received' }),
        Lead.countDocuments({
          status: { $nin: ['New Lead', ...TERMINAL_STATUSES] },
        }),
      ]);

    res.json({
      totalLeads,
      newLeads,
      inProcess,
      approved,
      subsidyReceived,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/leads/status-distribution
const getStatusDistribution = async (req, res, next) => {
  try {
    const distribution = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { _id: 0, status: '$_id', count: 1 } },
      { $sort: { count: -1 } },
    ]);

    res.json(distribution);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  deleteLead,
  assignLead,
  addNote,
  addStatus,
  getLeadStats,
  getStatusDistribution,
};
