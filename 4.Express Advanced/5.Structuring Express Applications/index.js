// Reestruturando a aplicação em Node
// Fazendo um refactor e separando em arquivos partes do código
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const app = express()
const mutants = require('./routes/mutants') // importando minhas rotas de outro módulo
// const xmen = require('./routes/x-men')

app.use(express.json())

app.use(helmet())
app.use(morgan('tiny'))

// Agora as rotas funcionam como um middleware
// Precismos passar dois paramtros para ele
// O primeiro é o path
// e o segundo é a variável que usamos para importar as rotas
app.use('/x-men/mutants', mutants) // Estamos dizendo aqui que toda rota que usar /x-men/mutants
// vem da variável mutants

// app.use('/', xmen)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))
