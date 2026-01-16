const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes"); // ✅ ADD

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

// ✅ CONTACT API
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
