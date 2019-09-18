// Em JSON, nodeJS quano o código é executado, ele 'wraps' (transpila), 
// através de uma função, é convertido em uma function abaixo,
// (function (exports, require, module, __filename, __dirname) {
//   ... // todo o código vem aqui para dentro
// é chamado de module expression ou if
// })
// Essa function acima é chamada de Module Wraps Exports
console.log(__filename)
console.log(__dirname)

const path = require('path') // passando './path' node assume que é um arquivo.
// sem './' node entende que estamos chamando um módulo dele.

const pathObj = path.parse(__filename) // usaremos um método do JS para transformar a 
// resposta em um objeto

console.log(pathObj)