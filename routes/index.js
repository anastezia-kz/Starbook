const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user");
const Post = require("../models/post");
const axios = require("axios")
// photo upload 
const Photo = require('../models/photo.js');
const uploadCloud = require('../config/cloudinary.js');
const passport = require("../auth/passport")


/* GET home page */
router.get('/',  async (req, res, next) => {
  let user
    if (req.session.currentUser) {
      user = await User.findById(req.session.currentUser._id)
    }  
      res.render('index', {user});
});


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