const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_PORT) || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('Email credentials are not configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const info = await transporter.sendMail({
    from: `"Sri Radhey Consultancy" <${user}>`,
    to: to || process.env.EMAIL_TO,
    subject,
    text,
    html,
  });

  console.log('Email sent successfully:', info.messageId);
  return info;
};

module.exports = sendEmail;
