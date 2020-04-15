const express = require("express");
const router = express.Router();
const Multer = require("multer");
const Photo = require('../models/photo.js');
const User = require('../models/user')

const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const s3 = new aws.S3();

const uploader = new Multer({
  
  storage: multerS3({
    s3: s3,
    bucket: 'starbookbucket',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.get('/add', (req, res, next) => {
  res.render('./profile/photo-add');
});

router.post('/add', uploader.single('image'), (req,res,next) => {
  console.log('$$$$$$$$$$$' ,req.file)

  Photo.create({
    title: req.body.title,
    image: req.file.location
  })
  .then(photo => {
    console.log('photo created:', photo)
    User.findOneAndUpdate({_id:req.session.currentUser._id},
      {profileImg:photo})
      .then(user => res.redirect(`/profile/${user.id}`))
    })
  
  .catch(err => console.log(err))
})

module.exports = router;