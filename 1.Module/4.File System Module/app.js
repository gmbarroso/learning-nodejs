const fs = require('fs') // chamando o módulo do Node

// Quase todas as operações de fs. vem em duas formas: síncrona ou blocking
// e assíncrono ou non-blocking. Devemos usar sempre assíncrono, justamente
// por ser non-blocking. Construindo um servidor, por exemplo, em Node,
// Podemos querer permitir o acesso de diversos clientes na api de uma vez,
// e usando métodos assíncronos não permitiremos ou servidor ocupado.

// Primeiro um método síncrono
// const files = fs.readdirSync('./') // mostra todos os arquivos na raiz
// console.log(files)

// Usando método Assíncrono
// todo método assíncrono recebe uma função como argumento final
// Node chama essa função quando essa operação assíncrona estiver
// completa. Isso é chamado de callback
fs.readdir('./', function(err, files){
// fs.readdir('$', function(err, files){ // simulando um erro
    if (err) console.log('Error', err)
  else console.log('Result', files)
})