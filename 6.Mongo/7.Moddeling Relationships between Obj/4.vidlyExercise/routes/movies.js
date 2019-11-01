const { Movie } = require('../models/movie')
const { Genre } = require('../models/genre')
const express = require('express')
const router = express.Router()

const validateMovieObj = require('../validations/movieValidation')

router.get('/', async (req, res) => {
    const movie = await Movie
        .find()
        .sort('name')

    res.send(movie)
  })

  router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if (!movie) return res.status(404).send('This movie Id does not exist...')

    res.send(movie)
  })

router.post('/', async (req, res) => {
  const result = validateMovieObj(req, res)
  const genre = await Genre.findById(req.body.genre)

  if (result.error) return res.status(400).send(result.error.details)

  if (!genre) return res.status(400).send('Invalid genre')

  let movie = new Movie({
    title: req.body.title,
    cast: req.body.cast,
    year: req.body.year,
    genre: { // Só precisa passar o id do genero que eu quero associar
        _id: genre._id,
        name: genre.name
    }
  })

  movie = await movie.save()

  res.send(movie)
})

router.put('/:id', async (req, res) => {
    // why doesn't work?
    const result = validateMovieObj(req, res)
    const genre = await Genre.findById(req.body.genre)
  
    if (result.error) return res.status(400).send(result.error.details)

    if (!genre) return res.status(400).send('Invalid genre')
  
    const movieUpdate = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        cast: req.body.cast,
        year: req.body.year,
        genre: req.body.genre
      },
      { new: true }
    )
  
    if (!movieUpdate) return res.status(404).send('This movie Id does not exist...')
  
    res.send(movieUpdate)
  })

  router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
  
    if (!movie) {
      return res.status(404).send('This movie Id does not exist...')
    }
  
    res.send(movie)
  })

module.exports = router