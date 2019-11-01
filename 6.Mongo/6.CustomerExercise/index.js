const mongoose = require('mongoose')
const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')

const customers = require('./routes/customers')

mongoose.connect('mongodb://localhost:27017/exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))

app.use('/customers', customers)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))