const express = require('express');
const router = express.Router();
const filmsRouter = require('./films/films');
const filmsCategoriesRouter = require('./films/filmCategories');
const helloWorldRouter = require('./hello-world/helloWorld');

router.use('/', helloWorldRouter);
router.use('/films', filmsRouter);
router.use('/film/categories/', filmsCategoriesRouter);

module.exports = router;