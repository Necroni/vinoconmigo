const mongoose = require("mongoose")

const WineSchema = new mongoose.Schema({
  wineName: {
    type: String,
    required: true,
  },
  vineyard: {
    type: String,
    required: false,
  },
  vintage: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  abv: {
    type: Number,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryID: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model("Wine", WineSchema)