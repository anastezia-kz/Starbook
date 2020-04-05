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

router.get("/editProfile/:id", (req, res, next) => {
  const pageCount = 7;
  const requests = [];
  for (let i = 1; i <= pageCount; i++) {
    requests.push(swapi.get(`https://swapi.co/api/planets/?page=${i}`));
  }
  User.findById(req.params.id).then((user) => {
    Promise.all(requests)
      .then(function (values) {
        const planets = values.flatMap((value) => value.results);
        res.render("profile/edit-profile", { user, planets });
      })
      .catch((err) => console.log(err));
  });
});

router.get("/profile/:id", (req, res, next) => {
  // console.log('Express-session ',req.session)

  User.findById(req.params.id)
    .then((user) => {
      if (req.session.currentUser) {
        const loggedInUser =
          req.session.currentUser._id == user._id ? true : null;
        res.render("profile/profile", {
          user,
          planet: user.homeworld,
          loggedInUser,
        });
      } else {
        res.render("profile/profile", { user, planet: user.homeworld });
      }
    })
    .catch((err) => {console.log(err);
    });
});

module.exports = router;