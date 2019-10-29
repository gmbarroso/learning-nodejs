const mongoose = require('mongoose')
const movieSchema = require('../validations/mongoMovieValidator')

const Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies