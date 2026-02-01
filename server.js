const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ================================
   ✅ PROPER CORS CONFIG (FIX)
================================ */
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // local Vite frontend
      "https://domabharathi.netlify.app" // 🔴 replace after frontend deploy
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

/* middleware */
app.use(express.json());

/* connect database */
connectDB();

/* test route */
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

/* contact API */
app.use("/api/contact", contactRoutes);

/* start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
