const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const s3 = new aws.S3();
const uploader = require('./photo').uploader

router.get("/addpost", (req, res, next) => {
  res.render("post/add")
})

router.post("/addpost", uploader.single('Post-image'), (req, res, next) => {
  console.log("###",req.file)
  Post.create({
      title: req.body.title,
      body: req.body.body,
      postedBy:req.user._id,
      postImg: req.file && req.file.location
    })

    .then((post) => {
      //console.log("NEW POOOOOOOOST", post)
      res.redirect("/newsfeed")
    })
})

router.get("/editpost/:id", (req, res, next) =>{
  Post.findById(req.params.id)
  .then(post => {
    res.render("post/edit", {post})
  })
})

router.post("/editpost/:id", (req, res, next) => {
  const {title, body} = req.body;
  console.log('!!!!!!!!!');
  console.log({
    id: req.params.id,
    body,
  });
  Post.findOneAndUpdate(
    {_id: req.params.id}, {title, body}, {new:true})
    .then(post => {
      
      res.redirect ("/newsfeed")
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get("/deletepost/:id", (req, res, next) => {

  Post.deleteOne({_id:req.params.id})
  .then(() => {
      res.redirect("/newsfeed");
    })
    .catch(err => console.log(err));
});

module.exports = router;