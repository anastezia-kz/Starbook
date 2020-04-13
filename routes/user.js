const express = require("express");
const router = express.Router();

const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;
const { spaceships, planets, species } = require("../seeds/spaceshipPlanetsSpecies");


router.get("/editProfile/:id", async (req, res, next) => {
  const resultSpaceship = spaceships.map(item => item.fields);
  const resultPlanets = planets.map(item => item.fields);
  const resultSpecies = species.map(item => item.fields)
  try {
    const user = await User.findById(req.params.id);
    res.render("profile/edit-profile", {
      user,
      planets: resultPlanets,
      spaceships: resultSpaceship,
      species:resultSpecies
    });
  
   
  } catch (e) {
    console.log(e);
  }

});

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
          planet: user.homeworld,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
