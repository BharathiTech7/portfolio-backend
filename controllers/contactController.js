const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

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
    const contact = await Contact.create({ name, email, message });

    // 2️⃣ Send email (MANDATORY)
    await sendEmail({ name, email, message });

    // 3️⃣ Respond only if email succeeded
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });

  } catch (error) {
    console.error("Contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

module.exports = { createContact };
