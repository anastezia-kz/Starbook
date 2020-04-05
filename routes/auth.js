const express = require("express");
const router = express.Router();
const passport = require("../auth/passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//added bcryptSalt
const bcryptSalt = 10;
const LocalStrategy = require("passport-local").Strategy;
const swapi = require("swapi-node");
const axios = require("axios");
// signup

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up",
    });
    return;
  }

  User.findOne({
    username: username,
  })
    .then((user) => {
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username is already taken! Try using another one!",
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create({
        username,
        password: hashPass,
      })
        .then((user) => {
          res.redirect(`/profile/${user.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      next(error);
    });
});


// login

router.get("/login", (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    message: req.flash("error"),
  });
});

router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up.",
    });
    return;
  }

  User.findOne({
    username: theUsername,
  })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist.",
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        req.session.currentUser = user;
        res.redirect(`/profile/${user.id}`);
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// logout

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
