const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user");
const Post = require("../models/post");
const axios = require("axios")

/* GET home page */
router.get('/', async (req, res, next) => {
  console.log(req.session)
  const users = await User.find();
  const posts = await Post.find();

  res.render('index', {users, posts});

});

router.post('/editProfile/:id', (req, res, next) => {
  const {age, bio, homeworld, /*spaceship*/} = req.body;
  console.log(req.body)
  User.findOneAndUpdate(
    {_id: req.params.id},  { age, bio, homeworld, /*spaceship*/}, {new:true})
      .then((user) =>
      { console.log(user)
        res.render('profile/profile', {user, planet: user.homeworld})},
      
      )
      .catch(e => {
          next(e)
      })
})




module.exports = router;