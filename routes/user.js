const express = require("express");
const router = express.Router();
const Photo = require("../models/photo");
const User = require("../models/user");

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


router.post('/editProfile/:id', (req, res, next) => {
  console.log('***************************************************');
  console.log('bla:', req.avatar);
  const {age, bio, homeworld, spaceship, species} = req.body;
  User.findOneAndUpdate(
    {_id: req.params.id},  { age, bio, homeworld, spaceship, species}, {new:true})
      .then((user) =>
      { console.log(user)
        console.log({user})
        res.render('profile/profile', {user, planet: user.homeworld})},
      
      )
      .catch(e => {
          next(e)
      })
})

// to adjust code below for Google login
router.get('/profile', (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", user)
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
})


router.get("/profile/:id", (req, res, next) => {
  User.findById(req.params.id).populate('profileImg')
    .then((user) => {
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", user)
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


router.post("/deleteprofile/:id", (req, res, next) => {

  User.findByIdAndRemove(req.params.id)
    .then(user => {
      console.log("DELETED", user);
      res.redirect("/");
    })
    .catch(err => console.log(err));
});


module.exports = router;
