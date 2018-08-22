const Joi = require('joi');

const schema = {
  id: Joi.string(),
  title: Joi.string().min(3),
  description: Joi.string().min(3).max(500),
  films: Joi.array().items(Joi.string().min(3)),
};

module.exports = schema;