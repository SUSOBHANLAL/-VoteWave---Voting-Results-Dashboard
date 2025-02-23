const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  party: {
    type: String,
    enum: ["BJP", "TMC", "CONGRESS", "Others"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
