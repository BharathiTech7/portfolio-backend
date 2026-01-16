const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <domabharathi05@gmail.com>`, // ✅ VERIFIED EMAIL
    to: "domabharathi05@gmail.com", // where you receive
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
