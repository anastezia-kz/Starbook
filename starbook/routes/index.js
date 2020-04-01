const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user");
const axios = require("axios")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// router.get('/profile', (req, res, next) => {
//   axios({
//     method: "GET",
//     url: "https://swapi.co/api/planets",
//   })
//     .then(response => {
//       const planets = response.result.sort((planet) => {
//         return {name:planet.name, url:planet.url}
//       })
//       User.find()
//       .then(users => {
//         res.render('profile/profile', {users, planets})
//       })


//       // Here we can do something with the response object
//     })
//     .catch(err => {
//       // Here we catch the error and display it
//     });


// })

module.exports = router;