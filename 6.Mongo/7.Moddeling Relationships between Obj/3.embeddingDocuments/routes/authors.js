const Authors = require('../models/authorModel')
const express = require('express')
const router = express.Router()

// const validateCustomerObj = require('../validations/customerValidation')

router.get('/', async (req, res) => {
    const authors = await Authors.find().sort('name')
    res.send(authors)
  })

router.post('/', async (req, res) => {
//   const result = validateCustomerObj(req, res)

//   if (result.error) return res.status(400).send()

  let author = new Authors({
    name: req.body.name,
    bio: req.body.bio,
    website: req.body.website,
  })

  author = await author.save()
  res.send(author)
})

module.exports = router