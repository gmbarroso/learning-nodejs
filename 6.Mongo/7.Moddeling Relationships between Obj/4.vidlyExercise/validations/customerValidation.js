const Joi = require('joi')

const validateCustomerObj = (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().required(),
  }

  return Joi.validate(req.body, schema, { abortEarly: false })
}

module.exports = validateCustomerObj