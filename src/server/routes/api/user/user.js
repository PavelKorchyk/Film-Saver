const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//Bring in User Model
const User = require('../../../models/user');

//Register Form
router.post('/signup', (req, res, next) => {
  if (
    validator.isEmail(req.body.email) &
    validator.isAlphanumeric(req.body.password) &
    validator.isAlphanumeric(req.body.username)
  ) next();
}) 
  .use((req, res, next) => {
    User
      .findOne({ email: req.body.email})
      .then(user => {
        if (user) {
          res.status(200).json({message: "not ok", email: "This email already exists"});
        } else {
          next();
        }
      })
  })
  .use((req, res, next) => {
    User
      .findOne({ username: req.body.username})
      .then(user => {
        if (user) {
          res.status(200).json({message: "not ok" , username: "This username is taken"});
        } else {
          next();
        }
    })
  })  
  .use((req, res, next) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    user.save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: err});
      })
  })

module.exports = router; 