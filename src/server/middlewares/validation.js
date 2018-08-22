const Joi = require('joi');

function dataValidation (schema) {
  return function (req, res, next) {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    };
    next();
  }
}

module.exports = dataValidation;
