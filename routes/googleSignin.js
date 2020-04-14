
// Google signin: JUST A RECAP OF THE CODE which is in auth.js and passport.js

// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;
// const passport = require("../auth/passport");

// begin with old code working if put in auth.js

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email"
//     ]
//   })
// )

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: ('/'),
//     failureRedirect: "/auth/login"
//   }),
// )

// TO BE ADDED TO PASSPORT,JS THIS ONE BELOW


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/google/callback"
// }, function (accessToken, refreshToken, profile, callback) {
//   User.findOne({
//       GoogleID: profile.id
//     })
//     .then(user => {
//       if (user) {
//         return callback(null, user)
//       }
//       User.create({
//           GoogleID: profile.id,
//           username: profile.emails[0].value
//         })
//         .then(newUser => {
//           callback(null, newUser)
//         })
//         .catch(e => callback(e))
//     })
//     .catch(e => callback(e))
// }))

// end old code


