const express = require("express");
const router = express.Router();
const PostImg = require("../models/postImg");
const Post = require("../models/post");
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const s3 = new aws.S3();
const uploader = require('./photo').uploader

router.get("/addpost", (req, res, next) => {
  res.render("post/add")
})

router.post("/addpost",uploader.single('Post-image'), (req, res, next) => {
  console.log("########################################",req.file)
  Post.create({
      title:req.body.title,
      body: req.body.body,
      postedBy:req.session.currentUser._id,
      postImg: req.file.location
    })
    
 
  .then((post)=> {
    //console.log("NEW POOOOOOOOST", post)
    res.redirect("/newsfeed")
  })
})

router.get("/editpost/:id", (req, res, next) => {
  Post.update({
      id: req.params.id,
      postedBy: req.user._id
    }, {
      title: req.body.title,
      body: req.body.body
    })
    .then(post => {
      res.render("post/add", {
        post
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;