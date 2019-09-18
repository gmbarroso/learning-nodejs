const EventEmitter = require('events')
const emitter = new EventEmitter()

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

const handleUserLog = (user) => (
  user.name
)

emitter.on('Log', e => {
  console.log(e)
})

emitter.emit('Log', handleUserLog(users[2]))