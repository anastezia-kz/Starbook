const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const axios = require("axios");
const interestingFact = require('../seeds/interestingFacts')

router.get("/", async (req, res, next) => {
  const userId = req.user._id;
  console.log({userId});
  const users = await User.find();
  const posts = await Post.find().populate("postedBy");
  console.log(posts);
  
  const index =  Math.floor(Math.random() * (interestingFact.length -1))
  const newFact = interestingFact[index]
  

  axios
    .get(
      `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GYPHY_API_KEY}&tag=star+wars&limit=1`
    )
    .then((giphyReturned) => {
      
      const giphy = giphyReturned.data.data.image_url;
      res.render("newsfeed", {
        users,
        posts,
        userId,
        giphy,
        newFact
      });
    })
    .catch((e) => console.log(e));
});

module.exports = router;
