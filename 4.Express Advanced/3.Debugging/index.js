// Muitas vezes, ao debugarmos nosso código, não queremos deixar
// console.log espalhados no código
// uma solução para isso é usar o debug package do node
// dessa forma, podemos setar quando que queremos logs na nossa aplicação e assim
// não precisa espalhar console.log no código nem se preocupar em apagá-los
// const startupDebug = require('debug')('app:startup')
// const dbDebug = require('debug')('app:db')
const debug = require('debug')
const morgan = require('morgan')
const express = require('express')
const app = express()

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  // console.log('Morgan enabled...')
  debug('Morgan enabled...')
}

// Talvez, em algum da nossa aplicação queremos saber quando
// de há algum acesso a um database
// dbDebug('connected to the database...') // console.log

// mudando no terminal que logs queremos ver 
// export DEBUG=app:startup
// export DEBUG=app:startup,app:db
// export DEBUG=app:*
// esport DEBUG=
// DEBUG=app:db npm start

// Nesse demo eu criei dois logs de debug, mas no mundo real não funciona assim
// 

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))