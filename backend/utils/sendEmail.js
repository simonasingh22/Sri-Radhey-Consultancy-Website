const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST || 'smtp-relay.brevo.com';
  const port = Number(process.env.EMAIL_PORT) || 587;
  const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_TO;

  console.log('Email config check:', {
    host,
    port,
    user,
    passExists: Boolean(pass),
    to: to || process.env.EMAIL_TO,
    from: fromEmail,
  });

  if (!user || !pass) {
    throw new Error('Email credentials are not configured');
  }

  if (!fromEmail) {
    throw new Error('EMAIL_FROM or EMAIL_TO is not configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });

  const info = await transporter.sendMail({
    from: `"Sri Radhey Consultancy" <${fromEmail}>`,
    to: to || process.env.EMAIL_TO,
    subject,
    text,
    html,
  });

  console.log('Email sent successfully:', info.messageId);
  console.log('Accepted recipients:', info.accepted);
  console.log('Rejected recipients:', info.rejected);

  return info;
};

module.exports = sendEmail;
