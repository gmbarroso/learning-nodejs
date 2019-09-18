// importando um módulo em Node
// require('./logger')
// Alocando um import em uma variável constante
const log = require('./logger') // Node assume que todos os arquivos estão em JS

// Antes
// log.logMessage('Estou vindo de outro arquivo')

// Depois
log('Estou carregando um módulo de outro arquivo')