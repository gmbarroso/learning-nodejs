const EventEmitter = require('events')

const users = [
  {
    id: 1,
    name: 'Guilherme Barroso',
    address: 'Rua Clodomiro Amazonas',
    number: '960',
  },
  {
    id: 2,
    name: 'Marcela Gueiros',
    address: 'Rua Clodomiro Amazonas',
    number: '960',
  },
  {
    id: 3,
    name: 'Benício Gueiros Barroso',
    address: 'Rua Clodomiro Amazonas',
    number: '960',
  }
]

class Logger extends EventEmitter {
  // Fazendo com que Logger tenha todos os métodos de EventEmitter
  log(message) { // Criando um método dentro de Logger
    console.log(message)

    this.emit('messageLogged', users)
  }
}

module.exports = Logger
