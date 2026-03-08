const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",    require("./routes/auth"));
app.use("/api/entries", require("./routes/entries"));

app.get("/", (req, res) => {
  res.json({ message: "PocketIQ API is running!" });
});

const MONGO = "mongodb+srv://pocketiquser:pocketiq123@pocketiq.rnzrlfp.mongodb.net/pocketiq?retryWrites=true&w=majority&appName=pocketiq";

console.log("Starting server...");

mongoose.connect(MONGO)
  .then(() => {
    console.log("✅ MongoDB connected!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("❌ MongoDB error:", err.message);
    process.exit(1);
  });