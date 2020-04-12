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


router.get("/editProfile/:id", async (req, res, next) => {
  const pageCount = 7;
  const requests = [];
  for (let i = 1; i <= pageCount; i++) {
    requests.push(swapi.get(`https://swapi.co/api/planets/?page=${i}`));
  }

  const countPage = 4;
  const reqs = [];
  for (let i = 1; i <= countPage; i++) {
    reqs.push(swapi.get(`https://swapi.co/api/starships/?page=${i}`));
  }
  try {
    const user = await User.findById(req.params.id) // .then((user) => {
    const values = await Promise.all(requests);
    const planets = values.flatMap((value) => value.results);
    const spaceShipResults = await Promise.all(reqs);
    const spaceships = spaceShipResults.flatMap((value) => value.results);
    res.render("profile/edit-profile", {
      user,
      planets,
      spaceships
    })
  } catch (err) {
    console.log(err);
  }
});


// router.get("/profile/profiletest", (req, res, next) => {
//   res.render("profile/profiletest");
// });

router.get("/profile/:id", (req, res, next) => {
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
        res.render("profile/profile", {
          user,
          planet: user.homeworld
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/profile/:id", (req, res, next) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       if (req.session.currentUser) {
//         const loggedInUser =
//           req.session.currentUser._id == user._id ? true : null;
//         res.render("profile/profile", {
//           user,
//           planet: user.homeworld,
//           loggedInUser,
//         });
//       } else {
//         res.render("profile/profile", {
//           user,
//           planet: user.homeworld
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;