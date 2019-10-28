const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
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

// Update
// const updateCourse = async (id) => {
//     // Atualizando um curso pelo seu id
//     const course = await Course.findById(id)

//     if (!course) return

//     if (course.isPublished) return
    
//     course.isPublished = true
//     course.author = 'Another Author' 

//     const result = await course.save()
//     console.log(result)
// }

// updateCourse('5db74f51dfb5495fac2b8f7d')

// Delete
const removeCourse = async (id) => {
    const result = await Course.deleteOne({ _id: id }) // deletar um apenas
    // const result = await Course.deleteMany({ _id: id })
    //ou
    // const course = await Course.findByIdAndRemove(id)
    
    console.log(result)
}

removeCourse('5db74f51dfb5495fac2b8f7d')