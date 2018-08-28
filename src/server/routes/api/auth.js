const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.json({emailError: "Couldn't find your email"});
        } else {
          return user;
        }
      })
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          return user;
        } else {
          res.json({passwordError: "Wrong password"});
        }
      })
      .then(user => {
        const payload = { email: user.email, password: user.password };
        const token = jwt.sign(payload, config.secretOrKey);
        res.json({ message: "ok", token: token, username: user.username, email: user.email }); 
      })
      .catch(err => console.log(err));
  }  
})

module.exports = router;