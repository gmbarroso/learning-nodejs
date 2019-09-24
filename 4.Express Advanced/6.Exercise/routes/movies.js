const express = require('express')
const router = express.Router()

const movies = require('../json/movies.json')
const validateMovieObj = require('../validations/movieValidator')

const getMovieById = (req, res) => {
  const movie = movies.find( m => {
    return (
      m.id === parseInt(req.params.id)
    )
   })
 
   if (!movie) (
     res.status(404).send('This movie is not register in our database.')
   )

   return movie
}

router.get('/', (req, res) => {
  res.send(movies)
})

router.get('/:id', (req, res) => {
  const movie = getMovieById(req, res)
  res.send(movie)
})

router.post('/', (req, res) => {
  const result = validateMovieObj(req, res)

  if (result.error) {
    const resultTransformed = result.error.details.map((err) => {
      return ({
        parameter: err.path[0],
        message: err.message
      })
    })

    return res.status(400).send({
      error: true,
      validationErrors: resultTransformed
    })
  }
  
  const movie = {
    id: movies.length + 1,
    title: req.body.title,
    year: req.body.year,
    cast: req.body.cast,
    genres: req.body.genres,
  }

  movies.push(movie)
  res.send(movie)
})

router.put('/:id', (req, res) => {
  const movieId = getMovieById(req, res)

  const { error } = validateMovieObj(req, res)
  if (error) {
    return res.status(400).send(result.error.details[0].message)
  }

  movieId.title = req.body.title
  movieId.year = req.body.year
  movieId.cast = req.body.cast
  movieId.genres = req.body.genres
  res.send(movieId)
})

router.delete('/:id', (req, res) => {
  const movie = getMovieById(req, res)

  const index = movies.indexOf(movie)
  movies.splice(index, 1)

  res.send(movie)
})

module.exports = router