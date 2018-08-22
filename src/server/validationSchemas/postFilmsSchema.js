const Joi = require('joi');

const schema = {
  id: Joi.string(),
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).max(500).required(),
  avatar: Joi.string().uri().required(),
  gallery: Joi.array().items(Joi.string().uri()).min(4).required(),
  rating: Joi.number().min(0).max(5),
  category: Joi.string(),
};

module.exports = schema;