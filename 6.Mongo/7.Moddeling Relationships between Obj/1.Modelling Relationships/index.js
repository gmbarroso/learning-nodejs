// Trade off between query performance vs consistency  
// é preciso pensar, na sua aplicação, qual o melhor tipo
// de relações entre dados eu vou querer. Ex: cursos

// Relações Using References (Normalization) -> CONSISTENCY
let author = {
    name: 'Guilherme Barroso'
}

let course = {
    author: 'id', // usando uma referência
}
// Aqui Temos diferentes collections que vamos utilizar suas propriedades
// para relacionarem-se

// Relações Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
    author: { // incorporando uma coleção dentro da outra
        name: 'Guilherme Barroso'
    }
}

// Hybrid
// Aqui é uma mistura de PERFORMANCE com CONSISTENCY


// Nessa abordagem a gente consegue rapidamente acessar o obj de course juntamente com
// o author para otimizar o desempenho da consulta. No entanto, não precisamos armazenar
// todas as propriedades de um author dentro de um course. Essa abrdagem é perfeita
// se queremos acessar instantaneamente os dados do meu banco num determinado momento

let author = {
    name: 'Guilherme'
    // 50 outras propriedades
}

let course = {
    author: {
        id: 'referencia',
        name: 'Guilherme'
    }
}
