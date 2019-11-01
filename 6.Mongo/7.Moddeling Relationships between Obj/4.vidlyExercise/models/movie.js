const mongoose = require('mongoose')
const { genreSchema } = require('./genre')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    cast: Array,
    year: {
        type: Number,
        required: true,
        maxlength: 5
    },
    genre: {
        type: genreSchema,
        required: true
    }
  })

const Movie = mongoose.model('Movie', movieSchema)

module.exports.Movie = Movie
module.exports.movieSchema = movieSchema