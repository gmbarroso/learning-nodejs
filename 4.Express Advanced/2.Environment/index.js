// No mundo real nós precisamos saber qual o ambiente em qe estamos rodando
// o nosso código: desenvolvimento, produção, etc...
// Talvez seja necessário habilitar ou não algumas features baseadas
// em qual ambiente estamos codando

// =========
// Ver este comentário por último
// É importante, no mundo real, setarmos as configurações da aplicação
// e como alterar o valor dessas configurações para cada ambiente de trabalho
// Por exemplo, no ambiente de desenvolvimento vamos usar um database diferente
// ou um serviços de e-mail diferente de cada ambiente
// =========
const Joi = require('joi')
// =========
const config = require('config') // para pegar as diferentes configurações que eu setei
// criar um arquivo chamado config
// =========
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const app = express()

// process object é uma variável global em node. O env que dá acesso ao 
// processo atual que o ambiente está sendo rodado
// NODE_env é um ambiente default. Quando não setado vem em undefined
// development
// testing
// staging
// production
console.log(`NODE_env: ${process.env.NODE_env}`)
// temos tb um outro jeito de pegar o ambiente que o nosso código está rodando
// através do express
console.log(`app: ${app.get('env')}`) // faz o que o console.log acima está fazendo, mas se não 
// estiver setado, retorna 'development' como default


app.use(express.json())
app.use(express.static('catalogue'))
app.use(helmet()) // ???

// =========
// Configuration
console.log(`Application Name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)
// Nunca devemos guardar coisas importantes nos arquivos de configurações
// como por exemplo password, api_key, cvv, etc
// para isso devemos guardar essas informações em variáveis de ambient ou
// environment variables
console.log(`Mail Password: ${config.get('mail.password')}`)
// =========

// Por exemplo, não é legal colocar os logs do morgan em ambiente de produção
// então. Faz sentido que habilitemos o log do morgan somente no ambiente de
// desenvolvimento, então...
if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  console.log('Morgan enabled...')
}
// experimentar setar para production no terminal
// set ou export NODE_ENV=production

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

app.get('/x-men/mutants',
  (req, res) => {
  res.send(mutants)
  }
)

app.get('/x-men/mutants/:id', (req, res) => {
  const mutant = getMutant(req, res)

  if (!mutant) (
    res.status(404).send('This mutant is not register in our database.')
  )

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


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))
