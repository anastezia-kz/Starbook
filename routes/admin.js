const express = require("express");
const router = express.Router();

const User = require("../models/user");
const passport = require("passport");

function checkRoles(role) {
    return function(req, res, next) {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      } else {
        res.redirect('/auth/login')
      }
    }
  }

router.get("/", checkRoles('ADMIN'),(req, res, next) => {
    res.render("admin/edituser", { message: req.flash("error") });
  });
  
router.post("/login", passport.authenticate("local", {
      successRedirect: "/index",
      failureRedirect: "/auth/login",
      failureFlash: true
    })
  );
module.exports = router;  