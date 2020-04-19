const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const axios = require('axios')

router.get('/', async (req, res, next) => {
  // console.log(req.user._id)
  // console.log(req.session)
  const users = await User.find();
  const posts = await Post.find().populate('postedBy')
    // console.log(posts)
  ;
  axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GYPHY_API_KEY}&tag=star+wars&limit=1`)
  .then(giphyReturned=> {
    const giphy = giphyReturned.data.data.image_url
    res.render('newsfeed', {users, posts, _id:req.user._id, giphy})
  })
  .catch(e => console.log(e))
});

// router.get('/', async (req, res, next) => {
//   console.log(req.session.currentUser._id)
//   console.log(req.session)
//   const users = await User.find();
//   const posts = await Post.find().populate('postedBy')
//     //console.log(posts)
//   ;

//   res.render('newsfeed', {users, posts, _id:req.session.currentUser._id});

// });


module.exports = router;