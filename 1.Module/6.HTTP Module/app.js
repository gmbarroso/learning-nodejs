// HTTP Modoule é um dos módulos mais poderosos do Node
// Ele pode ser usado para criar aplicações de conexões com web server
// Por exemplo, podemos criar um web Server que escula um http request numa
// porta qualquer. Criando, facilmente um backend para uma aplicação qualquer.

const http = require('http')

// const server = http.createServer()
// Acontece quem um http.createServer é um Event Emitter e ele vai
// carregar tudo o que um Event Emitter tem
// server.on
// server.addListener
// server.emit
// etc

// Ler depois de const server e server.on
const server = http.createServer((req, res) => {
  if (req.url === '/'){ // criando um endreço na minha app
    res.write('Hello World') // escrevendo na tela
    res.end() // terminando a minha conexão
  }

  if (req.url === '/x-man/mutants'){
    const mutants = [
      {
        mutant: "Cyclops",
        name: "Scott Summers",
        power: "Rajada ocular"
      },
      {
        mutant: "Iceman",
        name: "Bob",
        power: "Assumir forma de gelo"
      },
      {
        mutant: "Dazzler",
        name: "Alexis",
        power: "Emissão de luz através do som"
      },
      {
        mutant: "Strom",
        name: "Ororo",
        power: "Controladora do tempo"
      }
    ]

    res.write(JSON.stringify(mutants))
    res.end()
  }
})

// ler depois de listen
// server.on('connection', (socket) => {
//   console.log('New connection...')
// }) //nome do listener é connection, que pode ser visto
// na documentação
// socket é o segundo parametro desse listening que irá guardar e avisar
// sempre que houver uma conexão no meu servidor.
// Em Real world não se faz dessa forma. Isso é muito low level

server.listen(3001) // dando uma porta para a minha aplicação rodar local
// Só que antes de um listen, é bom registrarmos um listener, como visto
// acima com server.on

console.log('Listening to port 3001...')