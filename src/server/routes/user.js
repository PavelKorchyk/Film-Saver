const express = require('express');
const router = express.Router();

//Bring in User Model
let User = require('../models/user');

router.get('/login', (req, res, next) => {
  res.send();
});

//Register Form
router.get('/register', (req, res, next) => {
  res.send();
});

router.post('/register', (req, res, next) => {
  res.send(req.body);
});

module.exports = router; 