// Então um módulo é um arquivo. Toda function ou variável declarado dentro
// desse arquivo pertence somente ao escopo do arquivo/modulo
// é assim que funciona em node

const url = 'http://www.someapi.com'

const log = (message) => {
  console.log(message)
}

// Dado que no objeto module temosuma chave exports, podemos fazer:
// module.exports.url = url
// module.exports.logMessage = log
// estou inserindo chaves dentro do módulo exports para que elas
// possam ser acessadas por outro arquivo/módulo

// Podemos também exportar de outra maneira, apenas como uma function direto
module.exports = log

// Ler sobre Module Export Function
// exoports é uma referencia a module.exports
// doc de node https://nodejs.org/dist/latest-v10.x/docs/api/
// HTTP
// File System
// OS
// Path
// Process
// Query Strings
// Stream