// RESTful api
// Arquitetura:
// Client é o app itself
// como back temos um Server
// A comunicação acontece com um HTTP entre eles.
// REST - Representational State Transfer - http services
// Create Reade Update Delete - CRUD Operations
// HETTP Methods: GET, POST, PUT, DELETE

const Joi = require('joi') // importando um validador
// queremos a classe Joi

// Intro
// Express
// um framework para facilitar na construção de uma api e suas rotas
const express = require('express') // importando o express
const app = express() // colocando tudo o que o express traz em uma variável

app.use(express.json()) // importanto um middleware to express
// ele aceita formatos json que estamos usando em post



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



app.get('/', (req, res) => { // criando uma rota
  res.send('Hello World!!!')
})



app.get('/x-men/mutants', (req, res) => {
  res.send(mutants)
})



app.get('/x-men/:mutant/:power', (req, res) => { // definindo parametros
  // para a minha rota. qualquer nome que eu passar ele vai printar num
  // objeto
  // Route parameters, usado quando valores unicos são requisitados
  res.send(req.params)
})



app.get('/mutants/:group', (req, res) => {
  // query string parameters - usado para adicionar novos dados
  // ao meu serviço backend e para tudo que é opcional
  // res.send(req.params)
  res.send(req.query)
  // query parameters são dados salvos e alocados em objetos
})



app.get('/mutants/x-men/:id', (req, res) => {
  const mutant = mutants.find( m => { // .find é uma função do JS
   return (
     m.id === parseInt(req.params.id)
   )
  })

  if (!mutant) (
    res.status(404).send('This mutant is not register in our database.')
    // 404 é uma convenção de referencia quando um dado não é achado
  )

  res.send(mutant)
})



app.post('/x-men/mutants', (req, res) => { // adicionar um novo item na minha rota
// Nunca, jamais devemos confiar nos dados que os clientes estão mandando
// para a nossa api. Por isso é preciso validar os dados que estão entrando.
// Sendo assim, fazemos uma validação

// if (!req.body.name || req.body.name.length < 3) {
//   // Acontece que aqui eu estou fazendo duas validações diferentes
//   res.status(400).send('Name is required and need to have at least 3 caracters')
//   return
// }
  // Talvez seja melhor usar um framework que garanta o tipo de dado
  // que está entrando e faz esse trabalho de manipular as mensagens de rro
  // para mim
  // Para isso temos o JOI
  const schema = {
    name: Joi.string().min(3).required()
  }

  const result = Joi.validate(req.body, schema) // validando o tipo de dado que eu defini
  // que eu quero que entre. Função com dois parametros. O body da requisição
  // e o schema que eu montei. Tudo centro de uma variável pois ele
  // me retornará um objeto com um monte de informações.
  // console.log(result)
  // No resultado a gente consegue ver que é uma msg gigante que ele retorna para o usuário
  // podemos simplificar
  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return
  }

  const mutant = {
    id: mutants.length + 1,
    name: req.body.name
  } // definindo que o meu novo item será um objeto, pois ele fará parte
  // de um array que já existe.

  mutants.push(mutant) // adicionando ao array
  res.send(mutant) // printando na tela
})




// levantando um listener
const port = process.env.PORT || 3001 // dando uma porta para a minha
// aplicação node. Se nada estiver definido eu uso a 3001
// no terminal rodar: export PORT=5000 - Porta que eu estou dando para
// essa aplicação
app.listen(port, () => console.log(`Listening on port ${port}...`))
// app.listen(3001, () => console.log('Listening on port 3001...'))