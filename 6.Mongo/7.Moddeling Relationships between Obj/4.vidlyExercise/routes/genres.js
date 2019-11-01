const { Genre } = require('../models/genre')
const express = require('express')
const router = express.Router()

const validateGenreObj = require('../validations/genreValidation')

router.get('/', async (req, res) => {
    const genre = await Genre
        .find()
        .sort('name')

    res.send(genre)
  })

  router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('This genre Id does not exist...')

    res.send(genre)
  })

router.post('/', async (req, res) => {
  const result = validateGenreObj(req, res)

  if (result.error) return res.status(400).send(result.error.details)

  let genre = new Genre({ name: req.body.name })

  genre = await genre.save()

  res.send(genre)
})

router.put('/:id', async (req, res) => {
    const result = validateGenreObj(req, res)
  
    if (result.error) return res.status(400).send(result.error.details)
  
    const genreUpdate = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    )
  
    if (!genreUpdate) return res.status(404).send('This genre Id does not exist...')
  
    res.send(genreUpdate)
  })

  router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
  
    if (!genre) {
      return res.status(404).send('This Genre Id does not exist...')
    }
  
    res.send(genre)
  })

module.exports = router