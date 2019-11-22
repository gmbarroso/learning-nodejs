const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })

const Authors = mongoose.model('Authors', authorSchema)

module.exports = Authors