const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:   { type: String, required: true },
  tag:     { type: String, required: true },
  amount:  { type: Number, required: true },
  date:    { type: String, required: true },
  method:  { type: String, default: "card" },
  note:    { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Entry", entrySchema);