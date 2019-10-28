const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

// Como validar os dados de entrada no Mongo?
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /patter/ // for REGEX
    }, // required do Mongo é um forma de validar
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        // trim: true,
    },
    author: String,
    tags: {
        type: Array, // Por estar definido como um array o mongo sempre inicializará essa chave como um array vazio
        validate: {
            validator: function(v) {
                return v && v.length > 0
            },
        message: 'A course should have at least one tag'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    // Price is only required if published is true
    // não pode ser arrow function. Arrow function não tem o seu próprio 'this'
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v), // para caso o valor seja setado antes dessa lógica.
        set: v => Math.round(v)
    }
})

const Course = mongoose.model('Course', courseSchema)

const createCourse = async () => {
    const course = new Course({
        name: 'JavaScript FrontEnd',
        author: 'Barroso',
        category: 'Web',
        tags: ['frontend'],
        isPublished: true,
        // price: 20.8
    })
    
    // Dentro da mensagem de erro gigante, tem uma parte dizendo o que está acontecendo.
    // Uma forma de tratar esse erro para saber o que exatamente está acontecendo é:
    try {
        const result = await course.save()
        console.log(result)
    }
    catch (err) {
        // console.log(err.message) // Course validation failed: name: Path `name` is required.
        // console.log(err.errors)
        for (i in err.errors)
            console.log(err.errors[i].message)
    }

    // Essa forma de validaçõ só serve dentro do Mongo. O certo é ter
    // uma biblioteca de validação como o Joi. Dessa forma a gente garante
    // a forma de entrada do dado tanto na requisição quanto no save dentro do
    // database
}

createCourse()