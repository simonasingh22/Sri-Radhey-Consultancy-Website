const validator = require('validator');
const sendEmail = require('../utils/sendEmail');

const MAX_LENGTH = 5000;

const clean = (value) => validator.escape(String(value || '').trim());

const validateHoneypot = (req, res) => {
  if (req.body.website) {
    res.status(200).json({ status: 'success', message: 'Request received' });
    return false;
  }
  return true;
};

const sendLeadEmail = async ({ subject, title, fields }) => {
  const rows = fields
    .map(([label, value]) => `${label}: ${value || 'Not provided'}`)
    .join('\n');
  const text = `${title}\n\n${rows}\n\nSubmitted at: ${new Date().toISOString()}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><h2>${validator.escape(title)}</h2><table style="width:100%;border-collapse:collapse">${fields
    .map(([label, value]) => `<tr><td style="padding:10px;border-bottom:1px solid #eee"><strong>${validator.escape(label)}</strong></td><td style="padding:10px;border-bottom:1px solid #eee">${validator.escape(value || 'Not provided')}</td></tr>`)
    .join('')}</table><p style="color:#666;font-size:12px">Submitted at: ${new Date().toISOString()}</p></div>`;
  await sendEmail({ subject, text, html });
};

const contact = async (req, res, next) => {
  try {
    if (!validateHoneypot(req, res)) return;
    const { name, company, phone, email, district, industry, serviceRequired, message } = req.body;
    if (![name, company, phone, email, district, industry, serviceRequired].every((value) => String(value || '').trim())) {
      return res.status(400).json({ status: 'error', message: 'Please complete all required contact fields.' });
    }
    if (!validator.isEmail(String(email).trim())) return res.status(400).json({ status: 'error', message: 'Please provide a valid email address.' });
    if (String(message || '').length > MAX_LENGTH) return res.status(400).json({ status: 'error', message: 'Message is too long.' });
    await sendLeadEmail({
      subject: `New website enquiry - ${clean(serviceRequired)}`,
      title: 'New Contact Form Enquiry',
      fields: [['Name', clean(name)], ['Company', clean(company)], ['Phone', clean(phone)], ['Email', clean(email)], ['District', clean(district)], ['Industry', clean(industry)], ['Service required', clean(serviceRequired)], ['Message', clean(message)]],
    });
    return res.status(201).json({ status: 'success', message: 'Your enquiry has been sent successfully.' });
  } catch (error) {
    return next(error);
  }
};

const eligibility = async (req, res, next) => {
  try {
    if (!validateHoneypot(req, res)) return;
    const { branch, product, nocs, name, phone, email } = req.body;
    if (![branch, product, nocs].every((value) => String(value || '').trim())) return res.status(400).json({ status: 'error', message: 'Eligibility answers are required.' });
    if (email && !validator.isEmail(String(email).trim())) return res.status(400).json({ status: 'error', message: 'Please provide a valid email address.' });
    await sendLeadEmail({
      subject: `Eligibility review request - ${clean(product)}`,
      title: 'New Eligibility Review Request',
      fields: [['Name', clean(name)], ['Phone', clean(phone)], ['Email', clean(email)], ['Unit status', clean(branch)], ['Product / sector', clean(product)], ['NOC status', clean(nocs)]],
    });
    return res.status(201).json({ status: 'success', message: 'Your eligibility review has been submitted.' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { contact, eligibility };
