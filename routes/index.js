const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user");
const Post = require("../models/post");



// app + path test saturday April, 11 - until line 25
// const app     = express()
// const path    = require('path') 

// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'hbs');

// testing here below

// router.get("/profiletest", (req, res, next) => {
//   res.render("profile/profiletest");
// });

//end test

/* GET home page */
router.get('/',  async (req, res, next) => {
  let user
    if (req.session.currentUser) {
      user = await User.findById(req.session.currentUser._id)
    }  
      res.render('index', {user});
    


});




module.exports = router;