const express = require("express");
const router = express.Router();
// const passport = require("../auth/passport");
const Post = require("../models/post");
// const LocalStrategy = require("passport-local").Strategy;
// const swapi = require("swapi-node");
// const axios = require("axios");

router.get("/addpost", (req, res, next) => {
  res.render("post/add")
})

router.post("/addpost", (req, res, next) => {

  Post.create({
    title:req.body.title,
    body: req.body.body,
    postedBy:req.session.currentUser.username,
    // dateCreated: req.body.date
  })
  .then(()=> {
    res.redirect("/")
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