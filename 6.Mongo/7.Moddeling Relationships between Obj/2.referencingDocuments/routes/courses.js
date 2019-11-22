const Courses = require('../models/courseModel')
const express = require('express')
const router = express.Router()

// const validateCustomerObj = require('../validations/customerValidation')

router.get('/', async (req, res) => {
    const courses = await Courses
        .find()
        .populate('author', 'name -_id') // para puxar os dados de uma collection e por em outra (visual)
        // Como o id que está lá é um id que está numa outra collection, ele consegue
        // fazer as associações
        // Como segundo parametro no populate a gente coloca o que queremos visualizar e tirar de visualização.
        // .populate('author', 'name -_id') // Posso por quntos populate quiser para puxar dados de outras collections tb
        .sort('name')
    res.send(courses)
  })

router.post('/', async (req, res) => {
//   const result = validateCustomerObj(req, res)

//   if (result.error) return res.status(400).send()

  let course = new Courses({
    name: req.body.name,
    author: req.body.author
  })

  course = await course.save()
  res.send(course)
})

module.exports = router