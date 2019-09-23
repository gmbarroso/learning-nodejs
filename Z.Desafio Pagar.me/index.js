const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json()) // middleware
// sem isso o express não vai parse do body (req.body não existe)

const transactions = []

const cardOptions = [
  "credit_card",
  "debit_card"
]

const validateTransaction = (req, res) => {
  const schema = {
    amount: Joi.number().min(100).required(),
    product: Joi.string().max(30).required(),
    payment_method: Joi.valid(cardOptions),
    card_number: Joi.string().min(13).max(16).required(),
    owner: Joi.string(),
    cvv: Joi.string().min(3)
  }

  // validação de cartão pagar.me
  // começa com 4 visa
  // começa com tal Master card
  // ...

  // a bandeira fala que o cartão não existe.
  // só sabemos que o cartão não existe na hora da transação

  return result = Joi.validate(req.body, schema)
}

const formatDate = (date) => {
  const monthNames = [
    "1", "2", "3","4",
    "5", "6", "7","8",
    "9", "10","11", "12"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + '/' + monthNames[monthIndex] + '/' + year;
}

app.get('/transactions', (req, res) => {
  const transactionWithDateFormated = transactions.map((transaction) => {
    return ({
      ...transaction,
      created_date: formatDate(transaction.created_date)
    })
  })
  res.send(transactionWithDateFormated)
})

app.post('/transactions', (req, res) => {
  const result = validateTransaction(req, res)

  const cardNumber = req.body.card_number

  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  
  const transaction = {
    id: transactions.length + 1,
    amount: req.body.amount,
    product: req.body.product,
    payment_method: req.body.payment_method,
    card_number: cardNumber.substring(12),
    owner: req.body.owner,
    created_date: new Date(), // formato padrão é bom
    cvv: req.body.cvv
  }
  // backend deve retornar as coisas sempre da forma mais crua possível
  // o front cuida da apresentação dos números do cartão

  transactions.push(transaction)
  res.send({
    ...transaction,
    created_date: formatDate(transaction.created_date)
  })
})

const port = process.env.PORT || 3001 // variável de ambiente
app.listen(port, () => console.log(`Listening on port ${port}...`))

// não descnsar enquanto não entender pq o problema está acontecendo
// não assumir o que as pessoas falam como certo