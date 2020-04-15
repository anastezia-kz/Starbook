const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user");
const Post = require("../models/post");

/* GET home page */
router.get('/',  async (req, res, next) => {
  let user
    if (req.session.currentUser) {
      user = await User.findById(req.session.currentUser._id)
    }  
      res.render('index', {user});
});

module.exports = router;