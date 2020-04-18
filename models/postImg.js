const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const postImgSchema = new Schema({
  
   image: String
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const postImg = mongoose.model("PostImg", postImgSchema);

module.exports = postImg;