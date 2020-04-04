const express = require("express");
const router = express.Router();
const passport = require("../auth/passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//added bcryptSalt
const bcryptSalt = 10;
const LocalStrategy = require("passport-local").Strategy;
const swapi = require('swapi-node');


// I tried to rewrite it from scratch to practice and to adjust a couple of things,
// let me know what do you think!

// the code is below the old one! from LINE 79


// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup")
// })

// // Previous signup POST 

// // router.post("/signup", (req, res, next) => {
// //     console.log('works'+ JSON.stringify(req.body))
// //     const { username, password } = req.body;
// //         bcrypt.hash(password, 10).then(hash => {
// //           User.create({
// //             username: username,
// //             password: hash
// //           }).then(user => {
// //             console.log(username)
// //             res.render("/index", { user });
// //           });
// //         });
// //       });

// // Here below: Lloyd suggestion :)

// router.post("/signup", (req, res, next) => {
//   console.log('works' + JSON.stringify(req.body))
//   const {
//     username,
//     password
//   } = req.body;
//   bcrypt.hash(password, 10).then(hash => {
//     User.create({
//         username: username,
//         password: hash
//       }).then(user => {
//         res.redirect(`/profile/${user.id}`)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   });
// });

// //End of Lloyd suggestion

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", {
//     message: req.flash("error")
//   });
// });

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/auth/login",
//   failureFlash: true
// }));

// router.get("/logout", (req, res, next) => {
//   req.logout();
//   res.redirect("/");
// });

// module.exports = router;

//MATTEO's TEST HERE BELOW

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
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({
      "username": username
    })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username is already taken! Try using another one!"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create({
          username,
          password: hashPass
        })
        .then(user => {
          res.redirect(`/profile/${user.id}`);
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      next(error);
    })
});

router.get('/editProfile/:id', (req, res, next) => {
  const pageCount = 7;
  const requests = [];
  for (let i = 1; i <= pageCount; i++) {
    requests.push(swapi.get(`https://swapi.co/api/planets/?page=${i}`));
  }
  User.findById(req.params.id)
    .then(user => {
      Promise.all(requests)
      // Promise.all([swapi.get('https://swapi.co/api/planets/?page=1'), swapi.get('https://swapi.co/api/planets/?page=2'), swapi.get('https://swapi.co/api/planets/?page=3')])
        .then(function (values) {
          /* const results = values.map(value => {
            return value.results
          })
          // [...array1, ...array2, ...array3]
          const planets = [...results[0], ...results[1], ...results[2]] */
          const planets = values.flatMap((value => value.results));
          res.render('profile/edit-profile', {
            user,
            planets
          })
        })
        .catch(err => console.log(err))

    })
})

// code below not needed 

// swapi.get('https://swapi.co/api/people/').then((result) => {
//     console.log(result);
//     return result.nextPage();
// }).then((result) => {
//     console.log(result);
//     return result.previousPage();
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

// code above not needed


router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      axios.get(`${user.homeworld}`)
        .then(response => {
          const planet = response.data
          res.render('profile/profile', {
            user,
            planet
          })
        })
        .catch(err => {
          console.log(err)
        });
    })
})

// login 

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    message: req.flash("error")
  });
});

router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({
      "username": theUsername
    })
    .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {

        req.session.currentUser = user;
        res.redirect(`/profile/${user.id}`);
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    })
});

// logout

router.get("/logout", (req, res, next) => {
  //destroy session
  req.logout();
 
  res.redirect("/");
});

module.exports = router;