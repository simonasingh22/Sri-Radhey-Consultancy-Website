const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  console.log('Email config check:', {
    user,
    passExists: Boolean(pass),
    to: to || process.env.EMAIL_TO,
  });

  if (!user || !pass) {
    throw new Error('Email credentials are not configured');
  }

  // Explicit SMTP config instead of service:gmail
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,   // must be true for 465
    auth: {
      user,
      pass,
    },

    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,

    tls: {
      rejectUnauthorized: false
    }
  });

  // verify connection first
  await transporter.verify();
  console.log('SMTP connection verified');

  const info = await transporter.sendMail({
    from: `"Sri Radhey Consultancy" <${user}>`,
    to: to || process.env.EMAIL_TO,
    subject,
    text,
    html,
  });

  console.log('Email sent successfully:', info.messageId);
  console.log('Accepted recipients:', info.accepted);

  return info;
};

module.exports = sendEmail;
