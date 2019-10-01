// Muitas vezes queremos que que algumas operações assíncronas aconteçam
// ao mesmo tempo em paralelo, e quando elas são finalizadas, você quer 
// retornar uma única resposta.
// Por exemplo: Podemos querer acessar a api do facebook e depois do 
// instagram, e dai queremos um único resultado quando essas operações
// em paralelo tiverem sido resolvidas.

// Segue exemplo
const promise1 = new Promise((resolve) => { // pedindo entrada de só um
  // parametro. Não precisamos do reject se não usarmos
  setTimeout(() => {
    console.log(('Async operation 1...'))
    resolve(1)
  }, 2000);
})

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log(('Async operation 2...'))
    resolve(2)
  }, 2000);
})

// Promise.race([promise1, promise2])
//   .then(console.log)
Promise.all([promise1, promise2])
  // .then(console.log)
  .then(result => console.log(result))
  .catch(err => console.log('Error', err.message))