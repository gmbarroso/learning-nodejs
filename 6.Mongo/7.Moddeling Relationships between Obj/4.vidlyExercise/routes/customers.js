const { Customer } = require('../models/customer')
const express = require('express')
const router = express.Router()

const validateCustomerObj = require('../validations/customerValidation')

router.get('/', async (req, res) => {
    const customer = await Customer
        .find()
        .sort('name')

    res.send(customer)
  })

  router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).send('This Customer Id does not exist...')

    res.send(customer)
  })

router.post('/', async (req, res) => {
  const result = validateCustomerObj(req, res)

  if (result.error) return res.status(400).send(result.error.details)

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  })

  customer = await customer.save()

  res.send(customer)
})

router.put('/:id', async (req, res) => {
    const result = validateCustomerObj(req, res)
  
    if (result.error) return res.status(400).send(result.error.details)
  
    const customerUpdate = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      },
      { new: true }
    )
  
    if (!customerUpdate) return res.status(404).send('This Customer Id does not exist...')
  
    res.send(customerUpdate)
  })

  router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
  
    if (!customer) {
      return res.status(404).send('This Customer Id does not exist...')
    }
  
    res.send(customer)
  })

module.exports = router