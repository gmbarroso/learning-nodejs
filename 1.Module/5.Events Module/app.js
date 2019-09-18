// Um dos conceitos core do Node é o Events
// Um Event é um sinal para dizer que alguma coisa aconteceu na sua apli-
// cação. Por exemplo: em Node temo uma classe HTTP que pode ser usado
// para buildar um webserver. É dado para ele uma port para ele. E cada
// vez que recebemos um request nessa port, um Event acontece na classe
// HTTP. 
// Quando isso acontece, temos que garantir que a aplicação escute esse
// Event, lendo o requst e retornando uma response.
const EventEmitter = require('events') // emissor
// Toda classe começa com uma letra maiúscula
// Uma classe é um container para um monte de métodos e propriedades rela-
// cionadas a ele.

// Para usar esse emitter temos que, primeiro, criar uma instância dessa
// classe
const emitter = new EventEmitter() // é um objeto

// Human é uma Class e Guilherme é um Object

// Register a listener
emitter.on('messageLogged', (e) => { // e é um parametro que vai
  // receber os argumentos do Event
  console.log('Listener called', e)
})

// Raising event
emitter.emit('messageLogged', { id: 1, url: 'http://' }) // making a noise, an event is happening
// Ao rodarmos o código não acontece nada pq a gente levanta o Event, mas
// não montamos nenhum listener na aplicação para registrar esse Event.
// Um listener é uma function que é chamada quando esse Event for raised.

// Se chamarmos um listener depois do Event nãoa contece nada pq o pro-
// cesso é assíncrono.

// É importante passar informações desse evento encapsuladas em um
// objeto