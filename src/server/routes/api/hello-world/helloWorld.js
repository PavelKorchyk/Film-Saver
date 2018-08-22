const express = require('express');
const router = express.Router();

router.get('/hello-world/:name*?', (req, res) => {
  const name = req.params.name;
  if(!name) {
    res.status(404).json({error: "You didn't provide your name!"});
  } else {
    res.send(`<h2>Hello ${name}!</h2>`);
  }
});

module.exports = router;