const mongoose = require('mongoose')
const { authorSchema } = require('../models/authorModel')

const courseSchema = new mongoose.Schema({
    name: String,
    // No esquema Embedding é um pouco diferente. A collecgtion vai direto dentro dele
    author: authorSchema
  })

const Courses = mongoose.model('Courses', courseSchema)

module.exports.Courses = Courses
