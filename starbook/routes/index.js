const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user");
const axios = require("axios")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

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

module.exports = router;