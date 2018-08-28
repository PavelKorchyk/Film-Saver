const express = require('express');
const router = express.Router();
const filmsRouter = require('./films/films');
const filmsCategoriesRouter = require('./films/filmCategories');
const userRouter = require('./user/user');
const auth = require('./auth');
const passport = require('../../passport');

router.use('/auth', auth);
router.use('/films', passport.authenticate('jwt', { session: false }), filmsRouter);
router.use('/user', userRouter);
router.use('/film/categories/', filmsCategoriesRouter);

module.exports = router;