const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    year: {
        type: Number,
        required: true
    },
    cast: Array,
    genres: {
        type: Array,
        validate: {
            validator: function(i) {
                return i && i.length > 0
            },
        message: 'Should have at least one movie genre...'
        }
    }

  })

module.exports = movieSchema