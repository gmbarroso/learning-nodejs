// Callback approach

// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// Async/await approach
async function sendUserEmail() {
  try {
    const customer = await getCustomer(1)
    console.log(customer)
    if(customer.isGold) {
      const customerMovies = await getTopMovies()
      console.log(customerMovies)
      await sendEmail(customer.email, customerMovies)
      console.log(`Email sent to ${customer.name}`)
    }
  }
  catch(err) {
    console.log(err.message)
  }
}
sendUserEmail()

// Promise Approach
// getCustomer(1)
//   .then(customer => {
//     console.log(customer)
//     getTopMovies()
//       .then(movies => {
//         console.log(movies)
//         sendEmail()
//           .then(
//             console.log(`Email sent to ${customer.name}`)
//           )
//       })
//   })

function getCustomer(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Guilherme Barroso',
        isGold: true,
        email: 'email'
      });
    }, 4000);
  })
}

function getTopMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2'])
    }, 4000);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}