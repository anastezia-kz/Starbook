const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: String,
  body: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // dateCreated: Date
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post