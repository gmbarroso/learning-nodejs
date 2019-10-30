const mongoose = require('mongoose')
const customerSchema = require('../validations/mongoCustomerValidation')

const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    phone: String
  })

const Customers = mongoose.model('Customers', customerSchema)

module.exports = Customers
// exports.Customers = Customers
// exports.joiValidate = joiValidator