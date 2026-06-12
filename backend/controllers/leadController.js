const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');
const validator = require('validator');

// POST /api/leads
const createLead = async (req, res, next) => {
  try {
    const { name, company, phone, email, district, serviceRequired, message } = req.body;

    if (!name || !phone || !email) {
      res.status(400);
      return next(new Error('name, phone and email are required'));
    }

    // sanitize inputs
    const cleanName = validator.escape(String(name));
    const cleanCompany = company ? validator.escape(String(company)) : '';
    const cleanMessage = message ? validator.escape(String(message)) : '';
    const cleanDistrict = district ? validator.escape(String(district)) : '';
    const cleanService = serviceRequired ? validator.escape(String(serviceRequired)) : '';

    if (!validator.isEmail(String(email))) {
      res.status(400);
      return next(new Error('Invalid email format'));
    }

    const digits = (phone || '').replace(/\D/g, '');
    if (digits.length < 6) {
      res.status(400);
      return next(new Error('Invalid phone number'));
    }

    const lead = await Lead.create({
      name: cleanName,
      company: cleanCompany,
      phone: String(phone),
      email: validator.normalizeEmail(String(email)),
      district: cleanDistrict,
      whatsappNumber: req.body.whatsappNumber || '',
      serviceRequired: cleanService,
      message: cleanMessage,
    });

    // send notification email to admin
    try {
      const to = process.env.EMAIL_TO || process.env.EMAIL_USER;
      const subject = `New lead submitted: ${lead.name}`;
      const text = `Name: ${lead.name}\nCompany: ${lead.company || ''}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nService: ${lead.serviceRequired || ''}\nMessage: ${lead.message || ''}`;
      await sendEmail({ to, subject, text });
    } catch (emailErr) {
      // log but do not block response
      console.error('Error sending lead email:', emailErr.message || emailErr);
    }

    res.status(201).json(lead);
  } catch (err) {
    next(err);
  }
};

// GET /api/leads
const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    next(err);
  }
};

// GET /api/leads/:id
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
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
    await lead.remove();
    res.json({ message: 'Lead removed' });
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
    const note = { text, addedBy: req.admin ? req.admin._id : null };
    lead.notes.push(note);
    await lead.save();
    res.status(201).json(lead);
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
    const entry = { status, updatedBy: req.admin ? req.admin._id : null };
    lead.status = status;
    lead.statusHistory.push(entry);
    await lead.save();
    res.json(lead);
  } catch (err) {
    next(err);
  }
};

module.exports = { createLead, getLeads, getLeadById, deleteLead, addNote, addStatus };
