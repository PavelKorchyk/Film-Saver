const {DEFAULT_QUERY_FILMS_LIMIT} = require('../../constants/constants'); 
const {DEFAULT_QUERY_FILMS_OFFSET} = require('../../constants/constants');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('../../../passport');

const Films = require('../../../models/films');

const dataValidation = require('../../../middlewares/validation');
const postFilmsSchema = require('../../../validationSchemas/postFilmsSchema');
const putFilmsSchema = require('../../../validationSchemas/putFilmsSchema');

router
  .get('/', (req, res, next) => {
    console.log("Query:", req.query)
    Films
      .find({ title: (new RegExp(req.query.title, "i")) }, null, {      
        skip: Number(req.query.offset) || DEFAULT_QUERY_FILMS_OFFSET, 
        limit: Number(req.query.limit) || DEFAULT_QUERY_FILMS_LIMIT,
      })
      .then(result => {
        if (result.length === 0) {
          throw new Error('no data fund');
        }
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: err});
      })
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Films.findById(id)
      .populate('categories')
      .exec()
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({message: "Not found!"})
        }
      })
      .catch(err => {
        res.status(500).json({error: err});
      })
  })

  .post('/', passport.authenticate('jwt', { session: false }), dataValidation(postFilmsSchema),
  (req, res, next) => {
    const films = new Films({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      avatar: req.body.avatar,
      gallery: req.body.gallery,
      rating: req.body.rating,
      categories: req.body.categories,
    });
    films.save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({error: err});
      })
  })

  .put('/:id', passport.authenticate('jwt', { session: false }), dataValidation(putFilmsSchema),
  (req, res, next) => {
    Films.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec()
      .then(result => {
        if (!result) {
          res.status(400).json(result);
        } else {
          res.status(200).json(result);
        }
      })
      .catch(err => {
        res.status(500).json({ error: err});
      });
  })
  
  .delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const id = req.params.id;
    Films.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          result: result,
          "success":"true", 
          "id":id
        });
      })
      .catch(err => {
        res.status(500).json({ message: "Film is not deleted!" })
      })
  });

module.exports = router;