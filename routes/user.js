const express = require("express");
const router = express.Router();

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
          planet: user.homeworld,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/delete-profile/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      console.log("@@@@@@@@@@@", user);
      res.redirect("/");
    })
    .catch(err => console.log(err));
});


module.exports = router;
