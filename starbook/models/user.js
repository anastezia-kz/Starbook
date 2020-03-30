const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
  username: {type: String, unique:true},
  password: String,
  profileImg: String,
  information: String,
  homeworld:String,
  birth_year: String,
  films:String,
  
  role: {
      type: String,
      enum: ['ADMIN','USER','GUEST'],
      default: 'GUEST' 
    }
},
  {
      timestamps:true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User