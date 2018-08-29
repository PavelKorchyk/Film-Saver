const Joi = require('joi');

const schema = {
  id: Joi.string(),
  title: Joi.string().min(3),
  description: Joi.string().min(3).max(500),
  avatar: Joi.string().uri(),
  gallery: Joi.array().items(Joi.string().uri()).min(4),
  rating: Joi.number().min(0).max(5),
  categories: Joi.string(),
};

module.exports = schema;