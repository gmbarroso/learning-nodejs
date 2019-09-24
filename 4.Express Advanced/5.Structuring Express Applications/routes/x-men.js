const express = require('express')
const router = express.Router

router.get('/', (req, res) => {
  res.send('index', { title: 'The Uncanny X-men', message: 'To me my X-men!!!'})
  }
)

module.exports = router