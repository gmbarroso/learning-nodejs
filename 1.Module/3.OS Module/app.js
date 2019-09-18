// Pegando informação do Sistema Operacional - Método OS
const os = require('os')

const totalMemory = os.totalmem()
const freeMemory = os.freemem()

console.log(`Total Memory: ${totalMemory}`)
console.log(`Free Memory: ${freeMemory}`)

// loga o tanto de memória que está sendo usado e o quanto ainda temos livre
// Antes do Node, não era possível ver essa informação no terminal
// JS se resumia somente ao browser.
