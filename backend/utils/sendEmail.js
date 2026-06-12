const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error('Email environment variables are not fully configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465, // true for 465, false for other ports
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || user,
    to,
    subject,
    text,
    html,
  });

  return info;
};

module.exports = sendEmail;
