'use strict'

const { generateToken, verifyPassword } = require('./utils')

const repository = (container) => {
  const { database: db } = container.cradle
  const schema = 'sc_sca'

  const autenticar = (login, password) => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .first(
          'seq_pessoa',
          'dsc_login',
          'dsc_senha'
        )
        .from('sca_usuario')
        .where('dsc_login', login)
        .then(usuario => {
          if (usuario !== undefined) {
            verifyPassword(password, usuario.dsc_senha) ? 
            resolve(generateToken(usuario.seq_pessoa)) :
            reject('Login não encontrado')
          }
          reject('Login não encontrado')
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  return Object.create({
    autenticar
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject(new Error('connection db not supplied'))
    }
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, { connect })