const express = require("express");
const router = express.Router();
const multer = require("multer");
const Photo = require('../models/photo.js');
const uploadCloud = require('../config/cloudinary.js');


router.get('/add', (req, res, next) => {
  res.render('./profile/photo-add');
});

router.post('/add', uploadCloud.single('file'), (req, res, next) => {
  // const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newPhoto = new Photo({imgPath, imgName})
  // const newPhoto = new Photo({title, description, imgPath, imgName})
  newPhoto.save()
  .then(photo => {

    res.redirect(`/profile/${user.id}`, {photo});
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;