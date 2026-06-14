const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  console.log('Email config check:', {
    host,
    port,
    user,
    passExists: Boolean(pass),
    to,
  });

  if (!host || !port || !user || !pass) {
    throw new Error('Email environment variables are not fully configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  });

  await transporter.verify();
  console.log('SMTP server is ready to send emails');

  const info =await transporter.sendMail({
  from: `"Sri Radhey Consultancy" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_TO,
  subject: "New Website Inquiry - Sri Radhey Consultancy",
  html: emailHtml,
});

  console.log('Email sent successfully:', info.messageId);

  return info;
};

module.exports = sendEmail;
