const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user");
const Post = require("../models/post");
const axios = require("axios")
// photo upload 
const Photo = require('../models/photo.js');
const uploadCloud = require('../config/cloudinary.js');

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
router.get('/', async (req, res, next) => {
  console.log(req.session)
  const users = await User.find();
  const posts = await Post.find().populate('postedBy')
    console.log(posts)
  ;

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

// photo upload

router.get('/', (req, res, next) => {
  Photo.find()
  .then((photos) => {
    res.render('index', { photos });
  })
  .catch((error) => {
    console.log(error);
  })
});


router.get('/photo/add', (req, res, next) => {
  res.render('photo-add');
});

router.post('/photo/add', uploadCloud.single('photo'), (req, res, next) => {
  // const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newPhoto = new Photo({imgPath, imgName})
  // const newPhoto = new Photo({title, description, imgPath, imgName})
  newPhoto.save()
  .then(photo => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;