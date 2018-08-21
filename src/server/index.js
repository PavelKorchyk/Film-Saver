const express = require('express');
const app = express();

app.get('/', (req, res, next) => res.json({ "hi": "there" }));
app.listen(6000, () => console.log('Listening on port 6000!'));
