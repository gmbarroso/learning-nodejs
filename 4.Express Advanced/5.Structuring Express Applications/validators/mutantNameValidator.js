const Joi = require('joi')

const validateMutantName = (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return result = Joi.validate(req.body, schema)
}

module.exports = validateMutantName