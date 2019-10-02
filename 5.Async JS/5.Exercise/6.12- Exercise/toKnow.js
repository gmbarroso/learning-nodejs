const barroso = async () => {
  if (Math.random() < 0.5){
    throw new Error('quebrou')
  }

  return 1
}

const barroso = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.5) {
      reject(new Error('quebrou'))
    }

    resolve(1)
  })
}

const vellone = async () => {
  const barrosoResult = await barroso()
  return barrosoResult + 1
}

const ivan = async () => {
  try {
    const velloneResult = await vellone()
    const barrosoResult = await barroso()
    return velloneResult * 2 * barrosoResult
  } catch (erro) {
    console.log('erro no ivan')
    console.log(erro)
  }

  return 0
}

ivan().then(console.log)

// barroso()
//   .catch((erro) => {
//     console.log('deu erro!!!')
//   })

// try {
//   barroso()
// } catch(err) {
//   console.log('deu erro!!!')
// }