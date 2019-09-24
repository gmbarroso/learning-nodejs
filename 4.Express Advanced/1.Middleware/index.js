// Middleware
// Middleware functions é, basicamente uma function que pega uma
// request (req) e retorna, ou uma response (res) para o client ou um
// outro middleware como resposta.

// No exemplo dos X-men podemos ver diversos usos de diferentes middlewares
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./logger')
const authenticator = require('./authenticator')
const express = require('express')
const app = express()

app.use(express.json()) // middleware
// A cada request que for um json, ele passará por aqui para transformar
// esse request em um json legível para o node. (popula o req.body)

// como funciona?
// Todo request passa por um Request Processing Pipeline (RPP)
// Nesse pipeline teremos um ou mais middleware functions. E cada middleware
// vai retornar uma respose obj ou passa controle para outro middleware,
// tipo uma cadeia (exemplo logger e authenticator)

// Built-in middlewares
app.use(express.urlencoded({ exended: true })) // esse middleware usamos para que o meu
// possa compreeender requests sendo enviadas com diversas 'keys', por 
// exemplo de um objeto. Usamos o 'extended: true' para que ele entenda 
// requests complexas vindas de um form (arrays, objetos, etc). testar
// um post usando a oppção urlencoded no postman
app.use(express.static('catalogue')) // um outro middleware do express que
// usa arquivos estáticos para retornarem uma resposta ao cliente.
// ele cria uma rota usando o nome do arquivo criado dentro da pasta
// 'catalogue'. é usado apra arquivos de imagens, texto, etc

// Third-party middlewares
// atntar-se ao que usaremos pois cada import e app.use, consome o meu
// aplicativo
app.use(helmet()) // Middleware que protege contra alguns ataques básicos
app.use(morgan('tiny')) // log as requests no terminal

// app.use((req, res, next) => {
//   console.log('Logging...')
//   next() // next é o parametro passado para um middleware que diz: quando
//   // acabar o que você fez nessa função, passe a diante no RPP
//   // sem ele, nossa request fica presa.
// }) // É uma boa prática colocar todo middleware em um arquivo separado, 
// conforme linha 30
app.use(logger)

// app.use((req, res, next) => {
//   console.log('Authenticating...')
//   next()
// })
app.use(authenticator)

const mutants = [
  {
    id: 1,
    name: "Cyclops"
  },
  {
    id: 2,
    name: "Iceman",
  },
  {
    id: 3,
    name: "Dazzler",
  },
  {
    id: 4,
    name: "Strom",
  }
]

const getMutant = (req, res) => {
  const mutant = mutants.find( m => {
    return (
      m.id === parseInt(req.params.id)
    )
   })

   return mutant
}

const validateMutantName = (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return result = Joi.validate(req.body, schema)
}

// rotas
app.get('/x-men/mutants',
  (req, res) => { // middleware
  res.send(mutants)
  }
  // Nesta rota, por exemplo, o RPP tem duas middlewares:
  // uma é o parse para json() (linha 12) que quando termina passa por uma
  // rota (route()). essa rota retorna uma lista (response) para o cliente.
)

app.get('/x-men/mutants/:id', (req, res) => {
  const mutant = getMutant(req, res)

  if (!mutant) (
    res.status(404).send('This mutant is not register in our database.')
  )

  res.send(mutant)
})

// então, basicamente, em toda definição de rotas teremos middlewares
// pois todos pegam uma request e retorna uma resposta para o cliente
// como está sendo o exemplo dos dois GET's acima.

app.post('/x-men/mutants', (req, res) => {
  const result = validateMutantName(req, res)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  
  const mutant = {
    id: mutants.length + 1,
    name: req.body.name
  }

  mutants.push(mutant)
  res.send(mutant)
})


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))
