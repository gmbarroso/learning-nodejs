const Joi = require('joi')

const validateMovieObj = (req, res) => {
  const schema = {
    title: Joi.string().min(3).required(),
    year: Joi.number().required(),
    cast: Joi.array(),
    genres: Joi.array().min(1).required()
  }

  return Joi.validate(req.body, schema, { abortEarly: false })
}

module.exports = validateMovieObj