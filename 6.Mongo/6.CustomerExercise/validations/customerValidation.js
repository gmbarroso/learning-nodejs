const Joi = require('joi')

const validateCustomerObj = (req, res) => {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().required(),
    phone: Joi.string(),
  }

  return Joi.validate(req.body, schema, { abortEarly: false })
}

module.exports = validateCustomerObj