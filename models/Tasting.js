const mongoose = require("mongoose");

const TastingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  humanId: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tastingDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  wines: {
    type: Array,
    required: false,
  },
  participants: {
    type: Array,
    required: false,
  }
});

module.exports = mongoose.model("Tasting", TastingSchema);