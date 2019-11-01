// Intro Mongo
// Instalando o Mongo-Compass e docker na máquina
// Rodando o docker na porta desejada
// Iniciando...
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/playground') // returns a Promise
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
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)  // criando um model
// Num model a gente diz onde queremos guardar os dados e como (os dois parametros dentro de model)

const createCourse = async () => {
    const course = new Course({ // schemaLess
        name: 'Angular Course',
        author: 'Guilherme Barroso',
        tags: ['angular', 'frontend'],
        isPublished: true
    })
    
    const result = await course.save()
    console.log(result)
}

const getCourses = async () => { // commandos que podemos aplicar para retornar
    // os itens da minha db

    // Comparrison Operators
    // eq equal
    // ne not equal
    // gt greater than
    // gte greater or equal to
    // lt less than
    // lte lass than or equal to
    // in
    // nin not in

    // Logical Operators
    // or
    // and

    //Pagination
    const pageNumber = 2
    const pageSize = 10
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        // .find() // returns DocumentQueryObj
        .find({ author: 'Guilherme Barroso', isPublished: true })
        .skip((pageNumber -1) * pageSize)
        // .filter
        // .find ({ price: { $gt: 10, $lte: 20 } }) // greater than 10 dollars
        // .find( {price: { $in: [10, 15, 20]}})
        // .find()
        // .or([ { author: 'Guilherme Barroso' }, { isPublished: true } ]) // and igual
        // .find({ author: /^Guilherme/ }) // Regex para achar Guulherme tb
        // .find({ author: /Barroso$/i })
        // .find({ author: /.*Guilherme.*/i })
        .limit(pageSize)
        .sort({ name: 1 }) // 1 = assending -1 = dessending
        .count()
        // .select({ name: 1, tags: 1 })
    console.log(courses)
}

// createCourse()
getCourses()