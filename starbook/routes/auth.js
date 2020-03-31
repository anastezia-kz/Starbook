const express = require("express");
const router = express.Router();
const passport = require("passport");
const User           = require("../models/user");
const bcrypt         = require("bcrypt");
const LocalStrategy  = require("passport-local").Strategy;

router.get("/signup", (req, res, next) => {
    res.render("auth/signup")
  })

router.post("/signup", (req, res, next) => {
    console.log('works'+ JSON.stringify(req.body))
    const { username, password } = req.body;
        bcrypt.hash(password, 10).then(hash => {
          User.create({
            username: username,
            password: hash
          }).then(user => {
            console.log(username)
            res.render("/index", { user });
          });
        });
      });

router.get("/login", (req, res, next) => {
    res.render("auth/login", { message: req.flash("error") });
  });
  
router.post("/login", passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true
    })
  );
  
router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
  });
  
  module.exports = router;