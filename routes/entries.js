const express = require("express");
const jwt     = require("jsonwebtoken");
const Entry   = require("../models/Entry");
const router  = express.Router();

// Middleware — check login
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Not logged in" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get all entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add entry
router.post("/", auth, async (req, res) => {
  try {
    const entry = await Entry.create({ ...req.body, userId: req.userId });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update entry
router.put("/:id", auth, async (req, res) => {
  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body, { new: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete entry
router.delete("/:id", auth, async (req, res) => {
  try {
    await Entry.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;