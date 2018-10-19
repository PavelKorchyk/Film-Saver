const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  if (req.body.email || req.body.password) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.status(401).json({ Error: "Wrong email or password" });
          throw new Error("Wrong data");
        } 
        return user;
      })
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          return user;
        } else {
          res.status(401).json({ Error: "Wrong email or password" });
          throw new Error('Wrong data');
        }
      })
      .then(user => {
        const payload = { email: user.email, password: user.password };
        const token = jwt.sign(payload, config.secretOrKey);
        res.json({ 
          message: "ok", 
          token: token, 
          username: user.username, 
          email: user.email, 
          _id: user._id,
          ratedFilms: user.ratedFilms,
        }); 
      })
      .catch(err => console.log(err));
  }  
})

module.exports = router;