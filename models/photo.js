// models/photo.js

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const photoSchema = new Schema({
  
   image: String
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;