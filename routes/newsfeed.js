const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");


router.get('/', async (req, res, next) => {
  console.log(req.session.currentUser._id)
  console.log(req.session)
  const users = await User.find();
  const posts = await Post.find().populate('postedBy')
    console.log(posts)
  ;

  res.render('newsfeed', {users, posts, _id:req.session.currentUser._id});

});

module.exports = router;