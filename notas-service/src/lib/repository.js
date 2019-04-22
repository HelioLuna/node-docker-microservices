'use strict'

const repository = (container) => {
  const { database: db } = container.cradle
  const schema = 'sc_rhd'

  const getNotasByYear = (id, year) => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .first(
          'num_ano',
          'num_nota_desempenho',
          'num_nota_assiduidade',
          'num_nota_qualificacao',
          'num_nota_pontuacao_extra',
          'num_nota_final'
        )
        .from('vw_avaliacao_desempenho')
        .where({
          num_ano: year,
          seq_pessoa: id
        })
        .then(notas => {
          console.log(notas)
          resolve(notas)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  return Object.create({
    getNotasByYear
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