// Transformando o código de callbacks no uso das Promises
console.log('Eu venho antes...')

getUser()
    .then(user => {
        console.log('1', user)
        return getRepositories(user.gitHubUsername)
    })
    .then(repos => {
        console.log('2', repos)
        return getCommits(repos)
    })
    .then(result => {
        console.log('3', result)
    })
    .catch(error => {
        console.log('Error 404. Try again later', error.message)
    })

console.log('Eu venho depois...')

function getUser(id) {
    if (id === undefined) {
        return new Promise((resolve, reject) => {
            reject(new Error("id can't be undefined"))
        })
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from  a database...')
            resolve({
                id: id,
                gitHubUsername: 'gmbarroso'
            })
        }, 2000)
    })
}

function getRepositories(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user repositories')
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting repositorie commits...')
            resolve(['commit1', 'commit2'])
        }, 2000)
    })
}