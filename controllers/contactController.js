const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// @desc    Save contact form message
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ Save to DB
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // 2️⃣ Try sending email (but don't break API if it fails)
    try {
      await sendEmail({ name, email, message });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    // 3️⃣ Send response ONCE
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });

  } catch (error) {
    console.error("Contact create error:", error.message);

    // safety check
    if (res.headersSent) return;

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { createContact };
