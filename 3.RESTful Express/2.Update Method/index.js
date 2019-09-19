const Joi = require('joi')
const express = require('express')
const app = express()

// Para testar o método de update (PUT) vamos usar o mesmo codigo da introdução
// Além de adicionarmos um novo método vamos fazer uma melhoria no código.

app.use(express.json())

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

// Como alguns códigos irão se repetir, vou alocá-los em variáveis para serem
// rea proveitadas
const getMutant = (req, res) => {
  const mutant = mutants.find( m => {
    return (
      m.id === parseInt(req.params.id)
    )
   })
 
   if (!mutant) (
     res.status(404).send('This mutant is not register in our database.')
   )

   return mutant
}

const validateMutantName = (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return result = Joi.validate(req.body, schema)
}

// rotas
app.get('/x-men/mutants', (req, res) => {
  res.send(mutants)
})

app.get('/x-men/mutants/:id', (req, res) => {
  const mutant = getMutant(req, res)
  res.send(mutant)
})

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

app.put('/x-men/mutants/:id', (req, res) => {
  // O método tem que acessar o array de mutantes
  // Se não achar um mutante existente, retornar um 404
  const mutant = getMutant(req, res)

  // Se achou tem que validar esse dado
  // Se for inválido, retornar um 400
  const { error } = validateMutantName(req, res)
  if (error) {
    return res.status(400).send(result.error.details[0].message)
  }

  // Se tudo der certo ele tem que dar um update
  // e modificar o nome do mutante selecionado
  mutant.name = req.body.name
  res.send(mutant)
})


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))
