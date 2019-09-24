const express = require('express')
const router = express.Router()

const movies = require('../json/movies.json')

const getMovieByGenreOrName = (req, res) => {
  const movie = movies.filter( m => {
    return m.genres.includes(req.params.genres)
  })
  
  return movie
}

router.get('/:genres', (req, res) => {
  const movie = getMovieByGenreOrName(req, res)

  if (movie.length === 0) {
    return (
      res.status(404).send('This movie genre is not register in our database.')
    )
  }

  res.send(movie)
})

module.exports = router