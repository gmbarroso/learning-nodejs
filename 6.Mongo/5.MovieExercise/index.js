const mongoose = require('mongoose')
const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')

const movies = require('./routes/movies')
const genres = require('./routes/genres')

const logger = require('./middlewares/logger')
const authenticator = require('./middlewares/authenticator')

mongoose.connect('mongodb://localhost:27017/exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))

app.use(logger)
app.use(authenticator)

app.use('/movies', movies)
app.use('/genres/movies', genres)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))
