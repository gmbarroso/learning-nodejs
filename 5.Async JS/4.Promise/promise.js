// Promises
// Uma Promise é um objeto que contém o resultado final de uma operação assíncrona
// Portanto, quando uma operação assíncrona termina ele pode me retornar um valor
// ou um erro.
// Uma primise pode estar em três estados. Pending, Fulfilled (resolve) ou Rejected
// (reject)

// Exemplo

const promise = new Promise((resolve, reject) => {
    // Iniciando uma operação assíncrona (acessar um database por exemplo,
    // ou um webservice, ou uma api)
    // ...
    // Se completar teremos um valor ou um erro
    // Passando uma operação assíncrona para dentro da Promise
    setTimeout(() => {
        // resolve(1)
        reject(new Error('message'))
    }, 2000)
    // completado
    // resolve(1)
    // rejeitado
    // reject(new Error('message'))
})

// Temos que consumir essa Promise de alguma forma (.then ou .catch)
// promise.then // para pegar o valor da operação
// promise.catch // para pegar o erro da operação
promise
    .then(result => {
        console.log('Result', result)
    })
    .catch(err => {
        console.log('Error', err.message)
    })
