const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')

const movies = require('./routes/movies')
const genres = require('./routes/genres')

const logger = require('./middlewares/logger')
const authenticator = require('./middlewares/authenticator')

app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))

app.use(logger)
app.use(authenticator)

app.use('/movies', movies)
app.use('/genres/movies', genres)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))
