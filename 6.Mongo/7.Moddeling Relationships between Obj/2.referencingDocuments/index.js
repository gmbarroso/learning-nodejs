const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')

const courses = require('./routes/courses')
const authors = require('./routes/authors')

mongoose.connect('mongodb://localhost:27017/population', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use(morgan('tiny'))

app.use('/courses', courses)
app.use('/authors', authors)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))