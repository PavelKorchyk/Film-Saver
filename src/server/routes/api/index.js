const express = require('express');
const router = express.Router();
const filmsRouter = require('./films/films');
const filmsCategoriesRouter = require('./films/filmCategories');
const helloWorldRouter = require('./hello-world/helloWorld');
const userRouter = require('./user/user');

router.use('/', helloWorldRouter);
router.use('/films', filmsRouter);
router.use('/user', userRouter);
router.use('/film/categories/', filmsCategoriesRouter);

module.exports = router;