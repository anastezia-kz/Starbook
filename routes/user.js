const express = require("express");
const router = express.Router();
const Photo = require("../models/photo");
const User = require("../models/user");

const { spaceships, planets, species } = require("../seeds/spaceshipPlanetsSpecies");


router.get("/editProfile/:id", async (req, res, next) => {
    
  try {
    const user = await User.findById(req.params.id);
    const finalPlanet =  planets.map(({fields})=> {
      if(fields.name === user.homeworld ){
        return { ...fields, isSelected: true}
      }else{
          return fields
      }
    }
      )
      const finalKind =  species.map(({fields})=> {
        if(fields.name === user.species ){
          return { ...fields, isSelected: true}
        }else{
            return fields
        }
      })
        const finalShip =  spaceships.map(({fields})=> {
          if(fields.name === user.spaceship ){
            return { ...fields, isSelected: true}
          }else{
              return fields
          }
        })
    res.render("profile/edit-profile", {
      user,
      planets: finalPlanet,
      spaceships: finalShip,
      species:finalKind
    });
  
   
  } catch (e) {
    console.log(e);
  }

});


router.post('/editProfile/:id', (req, res, next) => {
  // console.log('***************************************************');
  
  const {age, bio, homeworld, spaceship, species} = req.body;
  User.findOneAndUpdate(
    {_id: req.params.id},  { age, bio, homeworld, spaceship, species}, {new:true})
      .then((user) =>
      { //req.session.currentUser = user
        console.log({user})
        res.redirect(`/profile/${user._id}`)},
      )
      .catch(e => {
          next(e)
      })
})

// to adjust code below for Google login
router.get('/profile', (req, res, next) => {

  if(!req.user) {
    return res.redirect('/login')
  }

  res.redirect(`/profile/${req.user._id}`)
  User.findById(req.user._id)
  .then((user) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", user)
      
      res.render("profile/profile", {
        user,
        // planet: user.homeworld,
        loggedInUser: true,
      });
    
  })
  .catch((err) => {
    console.log(err);
  });
})


router.get("/profile/:id", (req, res, next) => {

  if(!req.user) {
    return res.redirect('/login')
  }

  User.findById(req.params.id).populate('profileImg')
    .then((user) => {
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", {
        user,
        sessionUser: req.user,
      })

      let loggedInUser
      
        loggedInUser = req.user._id.toString() == user._id.toString() ? true : null;
        console.log("!!!!!!!!!!!!!!!!!!!", typeof req.user._id)
        console.log("??????????????????",typeof user._id)
        console.log('==', req.user._id == user._id)
        console.log("LOGGEDINUSER",loggedInUser)
        return res.render("profile/profile", {
          user,
          planet: user.homeworld,
          loggedInUser
        });
  
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/deleteprofile/:id", (req, res, next) => {

  User.deleteOne({_id:req.params.id})
  .then(() => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
});


module.exports = router;
