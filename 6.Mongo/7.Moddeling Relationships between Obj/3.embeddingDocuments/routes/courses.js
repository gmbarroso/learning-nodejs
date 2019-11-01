const Courses = require('../models/courseModel')
const { Authors } = require('../models/authorModel')
const express = require('express')
const router = express.Router()

// const validateCustomerObj = require('../validations/customerValidation')

router.get('/', async (req, res) => {
    const courses = await Courses
        .find()
        .populate('author', 'name -_id')
        .sort('name')
    res.send(courses)
  })

router.post('/', async (req, res) => {
//   const result = validateCustomerObj(req, res)

//   if (result.error) return res.status(400).send()

  let course = new Courses({
    name: req.body.name,
    author: new Authors({ name: 'Guilherme' })
  })

  course = await course.save()
  res.send(course)
})

module.exports = router