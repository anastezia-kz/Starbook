const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  profileImg: {
    type: String,
    default: "images/defaultImg.jpg"
  },
  bio: String,
  species: String,
  homeworld: {
    type: String,
    default: 'Naboo'
  },
  age: String,

  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User