const Joi = require('joi')

const validateGenreObj = (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  }

  return Joi.validate(req.body, schema)
}

module.exports = validateGenreObj