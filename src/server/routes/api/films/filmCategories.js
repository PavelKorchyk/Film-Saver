const {DEFAULT_QUERY_CATEGORIES_LIMIT} = require('../../constants/constants'); 
const {DEFAULT_QUERY_CATEGORIES_OFFSET} = require('../../constants/constants');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('../../../passport');

const Categories = require('../../../models/filmCategories');

const dataValidation = require('../../../middlewares/validation');
const postCategoriesSchema = require('../../../validationSchemas/postCategoriesSchema');
const putCategoriesSchema = require('../../../validationSchemas/putCategoriesSchema');

router
  .get('/', (req, res, next) => {
    Categories
      .find({}, null, {      
        skip: Number(req.query.offset) || DEFAULT_QUERY_CATEGORIES_OFFSET, 
        limit: Number(req.query.limit) || DEFAULT_QUERY_CATEGORIES_LIMIT,
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: err});
      })
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Categories
      .findById(id)
      .populate('films')
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      })
  })
  .post('/', passport.authenticate('jwt', { session: false }), dataValidation(postCategoriesSchema), 
    (req, res, next) => {
    const categories = new Categories({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      films: req.body.films,
    });
    categories
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: err});
      })
  })

  .put('/:id', passport.authenticate('jwt', { session: false }), dataValidation(putCategoriesSchema), 
    (req, res, next) => {
    Categories.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec()
      .then(result => {
        if (!result) {
          res.status(400).json(result);
        } else {
          res.status(200).json(result);
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      })
  })
  .delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Categories.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          result: result,
          "success":"true", 
          "id":id
          });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      })
  });

module.exports = router;