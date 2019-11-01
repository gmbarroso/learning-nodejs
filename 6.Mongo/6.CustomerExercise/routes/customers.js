const Customers = require('../models/customerModel')
const express = require('express')
const router = express.Router()

const validateCustomerObj = require('../validations/customerValidation')

router.get('/', async (req, res) => {
    const customers = await Customers.find().sort('name')
    res.send(customers)
  })

router.get('/:id', async (req, res) => {
  const customers = await Customers.findById(req.params.id)

  if (!customers) (
    res.status(404).send('This customers is not register in our database...')
  )

  res.send(customers)
})

// router.post('/', async (req, res) => {
//   const result = validateCustomerObj(req, res)

//   console.log(result)

//   if (result.error) return res.status(400).send()

//   let customer = new Customers({
//     isGold: req.body.isGold,
//     name: req.body.name,
//     phone: req.body.phone,
//   })

//   customer = await customer.save()
//   res.send(customer)
// })

router.post('/', (req, res) => {
    // fazendo no formato de Promise

    // const save = () => {
    
    // }

    const result = validateCustomerObj(req, res)
  
    if (result.error) return res.status(400).send(result.error.details)

    // Separar tudo em função
    const customer = new Promise((res, rej) => {
        res(new Customers({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone,
        }))
    })

    // const teste = (req, res) => {
    //     return new Promise
    // }

    // customer
    //     .then(save)
    //     .then(send)
    //     .catch(errorhandler)

    customer
        .then(result => {
            result.save()
            res.send(result)
        })
        .catch(error => {
            console.log('error', error)
        })

  })

  router.put('/:id', async (req, res) => {
    const result = validateCustomerObj(req, res)
  
    if (result.error) {
      return res.status(400).send(result.error.details)
    }
  
    const customer = await Customers.findByIdAndUpdate(
      req.params.id,
      {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
      },
      { new: true }
    )
  
    if (!customer) {
      return res.status(404).send('This Customer Id does not exist...')
    }
  
    res.send(customer)
  })

  router.delete('/:id', async (req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id)
  
    if (!customer) {
      return res.status(404).send('This Movie Id does not exist...')
    }
  
    res.send(customer)
  })

module.exports = router