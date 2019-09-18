// Node module System
console.log() // this is a global object
// temos muitas outras functions que são globais. Ex:
setTimeout()
clearTimeout()
setInterval()
clearInterval()

// Nos browsers temos como acessar todas essas functions declaradas no escopo global
window // window object
window.console.log // por exemplo
window.setTimeout

const message = '';
window.message

// Acontece que em Node não temos window.object
// Para acessar declarações no contexto global em Node a gente usa o global
global
global.console.log
global.setTimeout // etc

// No entanto
const message = ''
// não é acessível pelo contexto global
console.log(global.message) // sai undefined
// Ao rodar node intro.js o resultado será undefined
// isso acontece pq {message} é acessível somente no contexto deste arquivo, intro.js

// Modules
// Em Node, cada aqrquivo é considerado um módulo e todas as variáveis
// e funções declaradas dentro desse arquivo estão no escopo somente
// do arquivo onde essa função/variável foi declarada.
console.log(module) // Vejamos oq ue aparece ao rodarmos esse console no terminal
// Module {
//   id: '.',
//   exports: {},
//   parent: null,
//   filename:
//    '/home/gmbarroso/Desktop/mosh_hamedani/learning_node/intro.js',
//   loaded: false,
//   children: [],
//   paths:
//    [ '/home/gmbarroso/Desktop/mosh_hamedani/learning_node/node_modules',
//      '/home/gmbarroso/Desktop/mosh_hamedani/node_modules',
//      '/home/gmbarroso/Desktop/node_modules',
//      '/home/gmbarroso/node_modules',
//      '/home/node_modules',
//      '/node_modules' ] }

