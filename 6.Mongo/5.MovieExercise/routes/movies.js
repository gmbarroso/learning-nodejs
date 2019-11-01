const Movies = require('../models/models')
const express = require('express')
const router = express.Router()

const validateMovieObj = require('../validations/movieValidator')

// const getMovieById = (req, res) => {
//   const movie = Movies.find( m => {
//     return (
//       m.id === parseInt(req.params.id)
//     )
//    })
 
//    if (!movie) (
//      res.status(404).send('This movie is not register in our database.')
//    )

//    return movie
// }

router.get('/', async (req, res) => {
  const movies = await Movies.find().sort('title')
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const movie = await Movies.findById(req.params.id)

  if (!movie) (
    res.status(404).send('This movie is not register in our database...')
  )

  res.send(movie)
})

router.post('/', async (req, res) => {
  console.log('req', req)
  const result = validateMovieObj(req, res)

  console.log('result', result)
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

  let movie = new Movies({
    title: req.body.title,
    year: req.body.year,
    cast: req.body.cast,
    genres: req.body.genres,
  })

  console.log('movie1', movie)
  movie = await movie.save()

  console.log('movie2', movie)
  res.send(movie)
})

router.put('/:id', async (req, res) => {
  
  const { error } = validateMovieObj(req, res)

  if (error) {
    return res.status(400).send(error.details)
  }

  const movieId = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      year: req.body.year,
      cast: req.body.cast,
      genres: req.body.genres,
    },
    { new: true }
  )

  if (!movieId) {
    return res.status(404).send('This Movie Id does not exist...')
  }

  res.send(movieId)
})

router.delete('/:id', async (req, res) => {
  const movie = await Movies.findByIdAndRemove(req.params.id)

  if (!movie) {
    return res.status(404).send('This Movie Id does not exist...')
  }

  res.send(movie)
})

module.exports = router