const express = require('express')
// const app = express() // essa forma não funciona quando separamos as
// rotas em um módulo separado. então aqui a gente precisa de um Router
const router = express.Router()

const mutants = require('../json/xavierMutants')
const validateMutantName = require('../validators/mutantNameValidator')

const getMutant = (req, res) => {
  const mutant = mutants.find( m => {
    return (
      m.id === parseInt(req.params.id)
    )
   })

   return mutant
}

// com o import no index.js com o app.use('/x-men/mutans', mutants)
// podemos retirar esse endereço de todas as rotas
// router.get('/x-men/mutants',
router.get('/',
  (req, res) => {
  res.send(mutants)
  }
)

router.get('/:id', (req, res) => {
  const mutant = getMutant(req, res)

  if (!mutant) (
    res.status(404).send('This mutant is not register in our database.')
  )

  res.send(mutant)
})

router.post('/', (req, res) => {
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

module.exports = router