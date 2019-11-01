const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')

const customers = require('./routes/customers')
const genres = require('./routes/genres')
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost:27017/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use(morgan('tiny'))

app.use('/customers', customers)
app.use('/genres', genres)
app.use('/movies', movies)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))