const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth",    require("./routes/auth"));
app.use("/api/entries", require("./routes/entries"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "PocketIQ API is running!" });
});

// Connect to MongoDB — hardcoded connection string
mongoose.connect("mongodb+srv://pocketiquser:pocketiq123@pocketiq.rnzrlfp.mongodb.net/pocketiq?retryWrites=true&w=majority&appName=pocketiq")
  .then(() => {
    console.log("✅ MongoDB connected!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.log("❌ MongoDB error:", err.message);
  });