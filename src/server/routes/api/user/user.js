const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validator = require('validator');

//Bring in User Model
const User = require('../../../models/user');

//Register Form
router.post('/signup', (req, res, next) => {
  if (
    validator.isEmail(req.body.email) &
    validator.isAlphanumeric(req.body.password) &
    validator.isAlphanumeric(req.body.username)
  ) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    })
    user.save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: err});
      })
  } else {

  }
})

module.exports = router; 