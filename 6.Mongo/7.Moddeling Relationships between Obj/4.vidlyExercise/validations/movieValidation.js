const Joi = require('joi')

const validateMovieObj = (req, res) => {
  const schema = {
    title: Joi.string().min(3).required(),
    cast: Joi.array().min(1).items(Joi.string()),
    year: Joi.number().required(),
    genre: Joi.string().required()
  }

  return Joi.validate(req.body, schema, { abortEarly: false })
}

module.exports = validateMovieObj