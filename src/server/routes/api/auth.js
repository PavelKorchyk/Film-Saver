const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config');

/* POST login. */
router.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email, password: req.body.password})
      .then(user => {
        if (!user) {
          res.status(401).json({message: "wrong email or password"});
        } else {
          const payload = { email: user.email, password: user.password };
          const token = jwt.sign(payload, config.secretOrKey);
          res.json({ message: "ok", token: token, username: user.username, email: user.email });
        }   
      })
      .catch(err => console.log(err));
  }  
})

module.exports = router;