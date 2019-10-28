const mongoose = require('mongoose')
// const courseSchema = require('./schemas/courseSchema')

mongoose.connect('mongodb://localhost:27017/exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({ // schema de entrada de dados no meu DB
    name: String,
    author: String,
    tags: [ String ],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: Number
})

// Model
const Course = mongoose.model('Course', courseSchema)

const createCourse = async () => {
    const course = new Course({
        name: 'JavaScript FrontEnd',
        author: 'Guilherme Barroso',
        tags: ['html', 'frontend'],
        isPublished: true,
        price: 20
    })
    
    const result = await course.save()
    console.log(result)
}

createCourse()

// const getCourses = async () => {
//     return await Course
//     .find({ isPublished: true, tags: { $in: ['frontend', 'backend']}})
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1 })
// }

// const run = async () => {
//     const courses = await getCourses()
//     console.log(courses)
// }

// run()
