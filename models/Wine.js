const mongoose = require("mongoose");

const WineSchema = new mongoose.Schema({
// Name
// Vineyard
// Vintage
// Type
// ABV
// Region
// Tasting Notes
// Color
// Price (750mL)
// Body
// Pairings
// When finished I felt...
// MyRating
// Ratings
// Tags
// Drink again?
// Buy at 10
// Buy at 25
// Buy at 50
// Buy at 100
  
  
  
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Wine", PostSchema);