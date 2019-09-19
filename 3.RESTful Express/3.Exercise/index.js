const Joi = require('joi')
const express = require('express')
const app = express()

const movies = require('./movies.json')

app.use(express.json())

const validateMovieObj = (req, res) => {
  const schema = {
    title: Joi.string().min(3).required(),
    year: Joi.number().required(),
    cast: Joi.array(),
    genres: Joi.array().min(1).required()
  }

  return result = Joi.validate(req.body, schema)
}

const getMovieById = (req, res) => {
  const movie = movies.find( m => {
    console.log(req.params)
    return (
      m.id === parseInt(req.params.id)
    )
   })
 
   if (!movie) (
     res.status(404).send('This movie is not register in our database.')
   )

   return movie
}

const getMovieByGenreOrName = (req, res) => {
  const movie = movies.filter( m => {
    // m.title === req.params.title
    // m.genres === req.params.genres

    // if (req.params.genres === 'Action') {
    //   return m.genres.includes('Action')
    // }
    // if (req.params.genres === 'Drama') {
    //   return m.genres.includes('Drama')
    // }
    // if (req.params.genres === 'Biography') {
    //   return m.genres.includes('Biography')
    // }
    return m.genres.includes(req.params.genres)
  })

  // includes
  // filter
  // find
  // contains

  // Não misturar responsabilidade
  // if (movie.length === 0) { // Cannot set headers after they are sent to the client
  //   return ( // Converting circular structure to JSON
  //     res.status(404).send('This movie genre is not register in our database.')
  //   )
  // }
  
  return movie
}

app.get('/movies', (req, res) => {
  res.send(movies)
})

app.get('/movies/:id', (req, res) => {
  const movie = getMovieById(req, res)
  res.send(movie)
})

app.get('/movies/:genres', (req, res) => {
  const movie = getMovieByGenreOrName(req, res)

  if (movie.length === 0) {
    return (
      res.status(404).send('This movie genre is not register in our database.')
    )
  }

  res.send(movie)
})

app.post('/movies', (req, res) => {
  const result = validateMovieObj(req, res)

  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
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

app.put('/movies/:id', (req, res) => {
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

app.delete('/movies/:id', (req, res) => {
  const movie = getMovieById(req, res)

  const index = movies.indexOf(movie)
  movies.splice(index, 1)

  res.send(movie)
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))

// Não é boa prática instalar nodemon global
