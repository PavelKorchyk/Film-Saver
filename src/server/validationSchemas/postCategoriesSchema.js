const Joi = require('joi');

const schema = {
  id: Joi.string(),
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).max(500).required(),
  films: Joi.array().items(Joi.string().min(3)).required(),
  avatar: Joi.string().min(3).max(500).required(),
};

module.exports = schema;