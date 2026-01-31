const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // smtp.gmail.com
    port: process.env.SMTP_PORT, // 587
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // your gmail
      pass: process.env.SMTP_PASS, // app password
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // you receive mail
    replyTo: email,            // user email
    subject: "New Portfolio Contact Message 🚀",
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
