// models/photo.js

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const photoSchema = new Schema({
  // title: String,
  // description: String,
  imgName: String,
  imgPath: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

var Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;