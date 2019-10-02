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
    const courses = await Course
        // .find() // returns DocumentQueryObj
        .find({ author: 'Guilherme Barroso', isPublished: true })
        // .filter
        .limit(10)
        .sort({ name: 1 }) // 1 = assending -1 = dessending
        .select({ name: 1, tags: 1 })
    console.log(courses)
}

// createCourse()
getCourses()