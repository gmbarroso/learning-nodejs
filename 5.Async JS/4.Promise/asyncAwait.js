// Uma outra forma de trabalharmos com Promises é usando o async/await
// Async/await é como se fosse uma outra forma de trabalhar com promises
// vejamos o código que fizemos anteriormente
console.log('Eu venho antes...')

// Promise approach
// getUser(1)
//   .then(user => {
//     return getRepositories(user.gitHubUsername)
//   })
//   .then(repos => {
//     return getCommits(repos[0])
//   })
//   .then(commits => {
//     console.log('Commits', commits)
//   })
//   .catch(err => {
//     console.log('Error', err.message)
//   })

// Async/await approach
// tem uma forma específica de escrever
async function displayCommits() {
  try {
    const user = await getUser(1)
    const repos = await getRepositories(user.gitHubUsername)
    const commits = await getCommits(repos[0])
    console.log(commits)
  }
  catch(err) { // Para caso houver algum reject da Promise
    console.log('Error', err.message)
  }
}

displayCommits() // executando a função async/await

console.log('Eu venho depois...')

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...')
      resolve({
        id: id,
        gitHubUsername: 'gmbarroso'
      })
    }, 2000);
  })
}

function getRepositories(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting ${user} repositories`)
      resolve(['repo1', 'repo2', 'repo3'])
    }, 2000);
  })
}

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    console.log(repos)
    setTimeout(() => {
      console.log(`Getting ${repos} commits`)
      resolve(['commit1', 'commit2'])
    }, 2000);
  })
}