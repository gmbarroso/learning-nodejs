const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    // Por mais que eu insira uma nova chave no meu obj na hora do Post
    // o registro será somente de nome, pois é que o model dele está
    name: String,
    // agora não mais
    author: {
        type: mongoose.Schema.Types.ObjectId, // forma como dizemos que o tipo de entrada de dado é do proprio mongoose
        ref: "Authors" // Passar qual collectio estamos fazendo referencia
    }
  })

//   {
// 	"name": "React Course",
// 	"author": "5dbb3ea5fbb892678176f246"
// }

const Courses = mongoose.model('Courses', courseSchema)

module.exports = Courses