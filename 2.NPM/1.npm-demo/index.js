// Sempre que comçar um projeto node rode no terminal um npm init para
// gerar um package.json. Importante para guardar versões de libs que 
// pode ser usado no projeto.

// Exemplo: underscore
const underscore = require('underscore')
// Importante aqui: quando importamos uma lib nesse formato, Node assume
// que esse importe vem do core do Node.
// Se chamo dessa formar require('./underscore') Ele vai buscar um arquivo
// com esse nome e um index.js. O que não é o caso.
// Por último, ele busca se é alguma função do node_modules que veio com
// npm init.

// Vamos usar a function contains dessa lib
const results = underscore.contains([1, 2, 3], 3)

console.log(results)

// ver vídeo exemplo mongoose na udemy

// Semantic Version 
// "mongoose": "^5.7.1", // MajorVersion.MinorVersion.Patch
// "mongoose": "5.x", mesmo que o de cima
// "mongoose": "~5.7.1", todas as versões de 5 que foi lancada até agora
// "mongoose": "5.7.1 é seguro fazer sem nada

// criar .gitignore para não subir arquivos node_modules
// npm list
// npm list--depth=0

// npm view mongoose // package.json do mongoose
// npm view mongoose dependencies
// npm view mongoose versions

// npm i mongoose@version // para fazer um upgrade ou downgrade de package

// npm outdated

// npm i -g npm-check-updates // para ver todas as versões não updates

// npm i jshint --save-dev// um pacote que verifica onde pode ter uma possível
// falah no código em geral

// npm unisntall pacote // para deinstalar um package
