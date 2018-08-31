const express = require('express');
const router = express.Router();
const filmsRouter = require('./films/films');
const filmsCategoriesRouter = require('./films/filmCategories');
const userRouter = require('./user/user');
const auth = require('./auth');

router.use('/auth', auth);
router.use('/films', filmsRouter);
router.use('/user', userRouter);
router.use('/film/categories/', filmsCategoriesRouter);

module.exports = router;