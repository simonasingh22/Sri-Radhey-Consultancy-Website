const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  console.log('Email config check:', {
    user,
    passExists: Boolean(pass),
    to,
  });

  if (!user || !pass) {
    throw new Error('Email credentials are not configured');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
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
